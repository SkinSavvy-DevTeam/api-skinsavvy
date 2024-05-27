import * as Joi from 'joi';

const articleSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
});

export const postArticleCategoryPayloadSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .description('the category name with minimal of 3 chars'),
});

export const postArticleCategoryResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  message: Joi.string(),
  data: {
    id: Joi.string(),
    name: Joi.string(),
  },
});

export const getAllArticleCategoriesResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  data: {
    articleCategories: Joi.array().items(articleSchema),
  },
});
