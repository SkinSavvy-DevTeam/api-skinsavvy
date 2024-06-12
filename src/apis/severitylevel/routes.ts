import {ServerRoute} from '@hapi/hapi';
import {SeverityLevelHandler} from './handler';
import {
  baseSchema,
  getAllResponseSchema,
  getSpecificLevelResponseSchema,
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
  {
    method: 'GET',
    path: '/severity-levels',
    handler: handlers.getAllSeverityLevels,
    options: {
      tags: ['api'],
      description: 'Retrieve all available levels',
      response: {
        schema: getAllResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/severity-levels/{level}',
    handler: handlers.getSpecificLevel,
    options: {
      tags: ['api'],
      description: 'Retrieve specific level via level number',
      validate: {
        params: baseSchema,
      },
      response: {
        schema: getSpecificLevelResponseSchema,
      },
    },
  },
];

export default routes;
