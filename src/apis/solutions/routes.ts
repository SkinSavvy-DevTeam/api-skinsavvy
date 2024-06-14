import {ServerRoute} from '@hapi/hapi';
import {SolutionsHandler} from './handler';
import {
  getAllResponseSchema,
  getByIdParamSchema,
  getByIdResponseSchema,
  payloadSchema,
  postResponseSchema,
} from '../../validators/solutions/schema';

const routes = (handlers: SolutionsHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/solutions',
    handler: handlers.postSolution,
    options: {
      tags: ['api'],
      description: 'Add a new solution explanation',
      validate: {
        payload: payloadSchema,
      },
      response: {
        schema: postResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/solutions',
    handler: handlers.getAllSolutions,
    options: {
      tags: ['api'],
      description: 'Retrieve all solutions available in the database',
      response: {
        schema: getAllResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/solutions/{id}',
    handler: handlers.getSolutionById,
    options: {
      tags: ['api'],
      description: 'Retrieve a solution using an id',
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
