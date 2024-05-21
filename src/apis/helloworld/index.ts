import HelloWorldHandler from './handler';
import {Server} from '@hapi/hapi';
import routes from './routes';

const plugin = {
  name: 'helloworld',
  version: '1.0.0',
  register: (server: Server) => {
    const helloworldHandler = new HelloWorldHandler();
    server.route(routes(helloworldHandler));
  },
};

export default plugin;
