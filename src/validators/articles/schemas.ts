import * as Joi from 'joi';

export const postPayloadSchema = Joi.object({
  title: Joi.string().min(3),
  body: Joi.string().min(10),
  categoryName: Joi.string().min(3),
  thumbnailId: Joi.string().max(50),
});
