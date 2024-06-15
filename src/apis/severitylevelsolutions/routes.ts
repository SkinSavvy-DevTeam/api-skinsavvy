import {
  postPayloadSchema,
  postResponseSchema,
  getAllResponseSchema,
  getByLevelResponseSchema,
  getByLevelParamSchema,
} from '../../validators/severity-level-solutions/schemas';
import {SeverityLevelSolutionsHandler} from './handler';
import {ServerRoute} from '@hapi/hapi';

const routes = (handlers: SeverityLevelSolutionsHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/severity-level-solutions',
    handler: handlers.postSeveritySolution,
    options: {
      tags: ['api'],
      description:
        'Add a new relation regarding solution to a specified severity level',
      notes:
        'This endpoint provides a payload with two properties, namely `solutionId` and `levelId`, both are required. You can retrieve these values from their respective endpoints',
      validate: {
        payload: postPayloadSchema,
      },
      response: {
        schema: postResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/severity-level-solutions',
    handler: handlers.getAllSeveritySolution,
    options: {
      tags: ['api'],
      description: 'Retrieve all severity level solutions',
      response: {
        schema: getAllResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/severity-level-solutions/{level}',
    handler: handlers.getByLevel,
    options: {
      tags: ['api'],
      description: 'Retrieve specific severity level solution using an id',
      validate: {
        params: getByLevelParamSchema,
      },
      response: {
        schema: getByLevelResponseSchema,
      },
    },
  },
];

export default routes;
