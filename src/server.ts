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
import ClientError from './exceptions/ClientError';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';

// PLUGINS
import helloworld from './apis/helloworld';
import articlecategories from './apis/articlecategories';
// import skindiseases from './apis/skindiseases';
import articlethumbnails from './apis/articlethumbnails';
import articles from './apis/articles';
import severitylevel from './apis/severitylevel';
import solutions from './apis/solutions';
import severitylevelsolutions from './apis/severitylevelsolutions';

const options: ServerOptions = {
  port: process.env.PORT || 3821,
  host: process.env.HOST || 'localhost',
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
    // {
    //   plugin: skindiseases,
    // },
    {
      plugin: articlethumbnails,
    },
    {
      plugin: articles,
    },
    {
      plugin: severitylevel,
    },
    {
      plugin: solutions,
    },
    {
      plugin: severitylevelsolutions,
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
          } else if (response.code === 'P2025') {
            const newResponse = h
              .response({
                status: 'fail',
                message: 'Resource not found',
              })
              .code(404);

            return newResponse;
          } else {
            return h
              .response({
                status: 'fail',
                errorCode: response.code,
                message: response.message,
              })
              .code(400);
          }
        }

        if (!response.isServer) return h.continue;

        // Server ERROR
        const serverErrorResponse = h
          .response({
            status: 'error',
            message:
              'Something went wrong with the server. We are working on it immediately...',
            details: {
              name: response.name,
              stack: response.stack,
            },
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
