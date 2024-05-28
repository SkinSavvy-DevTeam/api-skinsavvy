import {ServerRoute} from '@hapi/hapi';
import {SkinDiseasesHandler} from './handler';
import {
  basePayloadSchema,
  baseResponseSchema,
  getAllResponseSchema,
  getByIdParamSchema,
  getByIdResponseSchema,
  idSchema,
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
  {
    method: 'GET',
    path: '/skin-diseases/{id}',
    handler: handlers.getSkinDiseaseById,
    options: {
      tags: ['api'],
      description: 'Retrieve a specific skin disease using an id',
      notes:
        'Please attach a request parameter as an id. For instance, `/skin-diseases/someid-i243j_ughj`',
      validate: {
        params: getByIdParamSchema,
      },
      response: {
        schema: getByIdResponseSchema,
      },
    },
  },
];

export default routes;
