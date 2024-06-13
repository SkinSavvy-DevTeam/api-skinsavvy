import {ServerRoute} from '@hapi/hapi';
import {SolutionsHandler} from './handler';
import {
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
];

export default routes;
