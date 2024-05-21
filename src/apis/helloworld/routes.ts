import {ServerRoute} from '@hapi/hapi';
import HelloHandler from './handler';

const routes = (handlers: HelloHandler): ServerRoute[] => [
  {
    method: 'GET',
    path: '/helloworld',
    handler: handlers.getHelloWorldHandler,
  },
];

export default routes;
