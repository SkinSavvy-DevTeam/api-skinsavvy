import * as Joi from 'joi';
import {title} from 'process';

export const postPayloadSchema = Joi.object({
  title: Joi.string().min(3),
  body: Joi.string(),
  categoryName: Joi.string().min(3),
  thumbnailId: Joi.string().max(50),
});

export const postResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  message: Joi.string().description('This is a description'),
  data: {
    id: Joi.string(),
    title: Joi.string(),
  },
});

export const getAllResponseSchema = Joi.object({
  status: 'success',
  message: Joi.string(),
  data: {
    articles: Joi.array().items(
      Joi.object({
        id: Joi.string(),
        title: Joi.string(),
        body: Joi.string(),
        category: Joi.string(),
        thumbnailUrl: Joi.string(),
      })
    ),
  },
});

export const getAllSchema = Joi.object({
  filterByTitle: Joi.string(),
});

export const getByIdSchema = Joi.object({
  id: Joi.string(),
});
export const getByIdResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: {
    article: Joi.object({
      id: Joi.string(),
      title: Joi.string(),
      body: Joi.string(),
      category: Joi.string(),
      thumbnailUrl: Joi.string(),
    }),
  },
});
