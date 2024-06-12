import * as Joi from 'joi';

export const baseSchema = Joi.object({
  level: Joi.number().integer(),
});

export const postPayloadSchema = Joi.object({
  level: Joi.number()
    .integer()
    .description(
      'Provide a positive non-zero value if you wish to specify a new level'
    )
    .optional(),
}).optional();

export const postResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: baseSchema,
});

export const getAllResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: {
    levels: Joi.array().items(baseSchema),
  },
});

export const getSpecificLevelResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
  data: {
    level: Joi.number().integer(),
  },
});
