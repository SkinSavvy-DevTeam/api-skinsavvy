import HelloHandler from './handler';
import {ServerRouteSwagger} from '../../types/server-route-swagger';

const routes = (handlers: HelloHandler): ServerRouteSwagger[] => [
  {
    method: 'GET',
    path: '/helloworld',
    handler: handlers.getHelloWorldHandler,
    options: {
      tags: ['api'],
      description: 'An endpoint to check if the server is running correctly',
      notes: 'Hit this endpoint to check server running status',
    },
  },
];

export default routes;
