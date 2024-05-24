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
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';

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
      const {response} = request;

      if (response instanceof Error) {
        if (response instanceof ClientError) {
          const newResponse = h
            .response({
              status: 'fail',
              message: response.message,
            })
            .code(response.statusCode);

          return newResponse;
        }

        if (response instanceof PrismaClientKnownRequestError) {
          /* Uncomment these to see error
           * console.log(response.message, response.code);
           */

          if (response.code === 'P2002') {
            const newResponse = h
              .response({
                status: 'fail',
                message: 'Entry already exist',
              })
              .code(400);
            return newResponse;
          } else {
            return h
              .response({
                status: 'fail',
                message: `Some prisma client error with ${response.code} code`,
              })
              .code(400);
          }
        }

        if (!response.isServer) return h.continue;

        // Server ERROR
        const serverErrorResponse = h
          .response({
            status: 'error',
            message: 'terjadi kegagalan di server kami',
          })
          .code(500);
        return serverErrorResponse;
      }
      return h.continue;
    }
  );

  server.start();
  console.log(`Server is running on ${server.info.uri}`);
};
