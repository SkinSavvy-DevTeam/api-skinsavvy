import {
  Server,
  ServerOptions,
  ServerRegisterPluginObject,
  Request,
  ResponseToolkit,
  ResponseObject,
} from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import helloworld from './apis/helloworld';
import articlecategories from './apis/articlecategories';
import ClientError from './exceptions/ClientError';

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
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    {
      plugin: helloworld,
    },
    {
      plugin: articlecategories,
    },
  ];

  await server.register(plugins);

  server.ext(
    'onPreResponse',
    (request: Request, h: ResponseToolkit): ResponseObject | symbol => {
      const response = request.response;

      if (response instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: response.message,
          })
          .code(response.statusCode);
      }

      console.log(request);
      console.log(response);

      return h.continue;
    }
  );

  server.start();
  console.log(`Server is running on ${server.info.uri}`);
};
