import * as Joi from 'joi';

const thumbnailSchema = Joi.object({
  id: Joi.string(),
  filename: Joi.string(),
  url: Joi.string(),
});

export const postImageHeaderSchema = Joi.object({
  hapi: Joi.object({
    filename: Joi.string().required(),
    headers: Joi.object({
      'content-type': Joi.string()
        .valid(
          'image/apng',
          'image/avif',
          'image/gif',
          'image/jpeg',
          'image/png',
          'image/webp'
        )
        .required(),
    }).unknown(true),
  }).unknown(true),
}).unknown(true);

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
