import {ServerRoute} from '@hapi/hapi';
import {SeverityLevelHandler} from './handler';
import {
  postPayloadSchema,
  postResponseSchema,
} from '../../validators/severity-levels/schemas';

const routes = (handlers: SeverityLevelHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/severity-levels',
    handler: handlers.postSeverityLevel,
    options: {
      tags: ['api'],
      description: 'Add a new level',
      notes:
        'This endpoint provides an **optional** payload property. If `level` is a zero value, it will be auto-incremented. Else, it will use the specified value',
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
