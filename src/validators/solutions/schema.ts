import * as Joi from 'joi';

const baseSchema = Joi.object({
  explanation: Joi.string(),
});

const responseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
});

export const payloadSchema = baseSchema;
export const postResponseSchema = responseSchema.keys({
  data: {
    id: Joi.string(),
  },
});

export const getAllResponseSchema = responseSchema.keys({
  data: {
    solutions: Joi.array().items(
      baseSchema.keys({
        id: Joi.string(),
      })
    ),
  },
});

export const getByIdParamSchema = Joi.object({
  id: Joi.string(),
});

export const getByIdResponseSchema = responseSchema.keys({
  data: {
    solution: {
      id: Joi.string(),
      explanation: Joi.string(),
    },
  },
});
