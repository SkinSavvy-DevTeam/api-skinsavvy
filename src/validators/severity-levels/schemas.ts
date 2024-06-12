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
