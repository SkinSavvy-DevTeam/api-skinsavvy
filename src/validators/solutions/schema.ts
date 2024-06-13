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
