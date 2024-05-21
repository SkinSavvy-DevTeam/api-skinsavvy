import {Server, ServerOptions} from '@hapi/hapi';
import helloworld from './apis/helloworld';

const options: ServerOptions = {
  port: process.env.PORT || 3821,
  host: process.env.host || 'localhost',
  routes: {
    cors: {
      origin: ['*'],
    },
  },
};

const server = new Server(options);

export const init = async () => {
  await server.register([
    {
      plugin: helloworld,
    },
  ]);

  server.start();
  console.log(`Server is running on ${server.info.uri}`);
};
