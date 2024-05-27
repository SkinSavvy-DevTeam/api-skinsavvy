import * as Joi from 'joi';

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
});

export const postPayloadSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .description('the category name with minimal of 3 chars'),
});

export const postResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  message: Joi.string(),
  data: {
    id: Joi.string(),
    name: Joi.string(),
  },
});

export const getAllResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  data: {
    articleCategories: Joi.array().items(schema),
  },
});

export const getByIdParamSchema = Joi.object({
  id: Joi.string(),
});

export const getByIdResponseSchema = Joi.object({
  status: Joi.string(),
  data: {
    id: Joi.string(),
    name: Joi.string(),
  },
});
