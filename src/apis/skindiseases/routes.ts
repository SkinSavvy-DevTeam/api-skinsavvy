import {ServerRoute} from '@hapi/hapi';
import {SkinDiseasesHandler} from './handler';
import {
  basePayloadSchema,
  baseResponseSchema,
} from '../../validators/skin-diseases/schema';

const routes = (handlers: SkinDiseasesHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/skin-diseases',
    handler: handlers.postSkinDisease,
    options: {
      tags: ['api'],
      description: 'Add a new skin disease to database',
      notes: 'Add a new skin disease. Return error if the data is exist',
      validate: {
        payload: basePayloadSchema,
      },
      response: {
        schema: baseResponseSchema,
      },
    },
  },
];

export default routes;
