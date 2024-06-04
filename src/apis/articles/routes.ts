import {
  getAllResponseSchema,
  getAllSchema,
  getByIdResponseSchema,
  getByIdSchema,
  postPayloadSchema,
  postResponseSchema,
} from '../../validators/articles/schemas';
import {ArticlesHandler} from './handler';
import {ServerRoute} from '@hapi/hapi';

const routes = (handlers: ArticlesHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/articles',
    handler: handlers.postArticle,
    options: {
      tags: ['api'],
      description: 'Add new article',
      notes:
        'To `POST` an article, user must attach the `thumbnailId`. Therefore, user either have to upload a new thumbnail first to get a `thumbnailId`, or retrieve one of the available thumbnail. Cuz you cannot send these two types of request simultaneously',
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
    path: '/articles',
    handler: handlers.getAllArticles,
    options: {
      tags: ['api'],
      description:
        'Retrieve all articles. It also provides a request query as an optional parameter',
      notes:
        'If query is provided, endpoint will prioritize according to the query. If not, it will retrieve all the data',
      validate: {
        query: getAllSchema,
      },
      response: {
        schema: getAllResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/articles/{id}',
    handler: handlers.getArticleById,
    options: {
      tags: ['api'],
      description: 'Retrieve an article using an id',
      validate: {
        params: getByIdSchema,
      },
      response: {
        schema: getByIdResponseSchema,
      },
    },
  },
];

export default routes;
