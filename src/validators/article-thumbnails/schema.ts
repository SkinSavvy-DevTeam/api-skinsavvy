import * as Joi from 'joi';

const thumbnailSchema = Joi.object({
  id: Joi.string(),
  filename: Joi.string(),
  url: Joi.string(),
});

export const postImageHeaderSchema = Joi.object({
  image: Joi.any().meta({swaggerType: 'file'}).description('Image format'),
});

export const postThumbnailResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  message: Joi.string(),
  data: {
    thumbnail: {
      id: Joi.string(),
      filename: Joi.string(),
      url: Joi.string(),
    },
  },
});

export const getAllThumbnailResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: {
    thumbnails: Joi.array().items(thumbnailSchema),
  },
});

export const getThumbnailsWithQueryByName = Joi.object({
  filterByName: Joi.string().optional(),
});
