import * as Joi from 'joi';

const idSchema = Joi.string().required();
const nameSchema = Joi.string()
  .min(3)
  .description('the skin disease name with minimum of 3 chars');

export const basePayloadSchema = Joi.object({
  name: nameSchema,
});

export const baseResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  message: Joi.string(),
  data: {
    id: idSchema,
    name: nameSchema,
  },
});
