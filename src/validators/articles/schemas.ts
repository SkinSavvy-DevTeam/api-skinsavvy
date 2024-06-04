import * as Joi from 'joi';

export const postPayloadSchema = Joi.object({
  title: Joi.string().min(3),
  body: Joi.string().min(10),
  categoryName: Joi.string().min(3),
  thumbnailId: Joi.string().max(50),
});

export const getAllSchema = Joi.object({
  filterByTitle: Joi.string(),
});
