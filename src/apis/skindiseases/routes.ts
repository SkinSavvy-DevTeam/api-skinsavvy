import {ServerRoute} from '@hapi/hapi';
import {SkinDiseasesHandler} from './handler';
import {
  basePayloadSchema,
  baseResponseSchema,
  getAllResponseSchema,
  idParamSchema,
  getByIdResponseSchema,
  putByIdResponseSchema,
  deleteByIdResponseSchema,
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
        params: idParamSchema,
      },
      response: {
        schema: getByIdResponseSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/skin-diseases/{id}',
    handler: handlers.putSkinDiseaseById,
    options: {
      tags: ['api'],
      description: 'Update the name of a specified skin disease using an id',
      notes: 'Please provide the skin disease id',
      validate: {
        params: idParamSchema,
        payload: basePayloadSchema,
      },
      response: {
        schema: putByIdResponseSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/skin-diseases/{id}',
    handler: handlers.deleteSkinDiseaseById,
    options: {
      tags: ['api'],
      description: 'Delete skin disease resource using an id',
      notes: 'Please provide an id via request parameter',
      validate: {
        params: idParamSchema,
      },
      response: {
        schema: deleteByIdResponseSchema,
      },
    },
  },
];

export default routes;
