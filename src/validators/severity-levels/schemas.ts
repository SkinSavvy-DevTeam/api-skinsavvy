import * as Joi from 'joi';

export const baseSchema = Joi.object({
  level: Joi.number().integer(),
});

export const postPayloadSchema = Joi.object({
  name: Joi.string(),
  level: Joi.number()
    .integer()
    .description(
      'Provide a positive non-zero value if you wish to specify a new level'
    ),
});

export const postResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: {
    level: {
      id: Joi.string(),
      name: Joi.string(),
      level: Joi.number().integer(),
    },
  },
});

export const getAllResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: {
    levels: Joi.array().items(
      Joi.object({
        id: Joi.string(),
        name: Joi.string(),
        level: Joi.number().integer(),
      })
    ),
  },
});

export const getSpecificLevelResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: {
    level: Joi.object({
      id: Joi.string(),
      name: Joi.string(),
      level: Joi.number().integer(),
    }),
  },
});
