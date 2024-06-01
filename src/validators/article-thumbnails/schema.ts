import * as Joi from 'joi';

export const postImageHeaderSchema = Joi.object({
  hapi: Joi.object({
    filename: Joi.string().required(),
    headers: Joi.object({
      'content-type': Joi.string()
        .valid(
          'image/apng',
          'image/avif',
          'image/gif',
          'image/jpeg',
          'image/png',
          'image/webp'
        )
        .required(),
    }).unknown(true),
  }).unknown(true),
}).unknown(true);
