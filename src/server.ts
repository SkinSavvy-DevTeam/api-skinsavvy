import {Server, ServerOptions, ServerRegisterPluginObject} from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
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
const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'SkinSavvy API Documentation',
  },
};

export const init = async () => {
  const plugins: Array<ServerRegisterPluginObject<any>> = [
    Inert,
    Vision,
    {
      plugin: helloworld,
    },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ];

  await server.register(plugins);

  server.start();
  console.log(`Server is running on ${server.info.uri}`);
};
