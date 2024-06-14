import * as Joi from 'joi';

const solutionsSchema = Joi.object({
  id: Joi.string(),
  explanation: Joi.string(),
});

const levelsSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  level: Joi.number().integer(),
});

const baseResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  message: Joi.string(),
});

export const postPayloadSchema = Joi.object({
  solutionId: Joi.string(),
  levelId: Joi.string(),
});

export const postResponseSchema = baseResponseSchema.keys({
  data: {
    solution: solutionsSchema,
    level: levelsSchema,
  },
});
