import * as Joi from 'joi';

export const idSchema = Joi.string().required();
const nameSchema = Joi.string()
  .min(3)
  .description('the skin disease name with minimum of 3 chars');

const dataSchema = Joi.object({
  id: idSchema,
  name: nameSchema,
});

export const basePayloadSchema = Joi.object({
  name: nameSchema,
});
export const baseResponseSchema = Joi.object({
  status: Joi.string().valid('success', 'fail'),
  message: Joi.string().optional(),
  data: dataSchema,
});

export const getAllResponseSchema = baseResponseSchema.keys({
  data: {
    skinDiseases: Joi.array().items(dataSchema),
  },
});

export const getByIdResponseSchema = baseResponseSchema.keys({
  data: {
    skinDisease: dataSchema,
  },
});

export const idParamSchema = Joi.object({
  id: idSchema,
});

export const putByIdResponseSchema = baseResponseSchema.keys({
  data: {
    name: nameSchema,
  },
});

export const deleteByIdResponseSchema = Joi.object({
  status: Joi.string(),
  message: Joi.string(),
});
