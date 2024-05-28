import {ServerRoute} from '@hapi/hapi';
import {SkinDiseasesHandler} from './handler';
import {
  basePayloadSchema,
  baseResponseSchema,
  getAllResponseSchema,
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
  {
    method: 'GET',
    path: '/skin-diseases',
    handler: handlers.getAllSkinDiseases,
    options: {
      tags: ['api'],
      description: 'Retrieve all skin diseases available in the database',
      notes:
        'This endpoint receives no parameter nor payload. Therefore, no need to attach any data',
      response: {
        schema: getAllResponseSchema,
      },
    },
  },
];

export default routes;
