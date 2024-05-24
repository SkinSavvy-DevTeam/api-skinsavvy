import * as Joi from 'joi';

export const ArticleCategorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .description('the category name with minimal of 3 chars'),
});
