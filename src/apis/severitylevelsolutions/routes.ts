import {
  postPayloadSchema,
  postResponseSchema,
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
];

export default routes;
