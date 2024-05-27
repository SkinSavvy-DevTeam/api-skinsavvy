import {ServerRoute} from '@hapi/hapi';
import {ArticleCategoriesHandler} from './handler';
import {
  postResponseSchema,
  postPayloadSchema,
  getAllResponseSchema,
  getByIdParamSchema,
  getByIdResponseSchema,
} from '../../validators/article-category/schema';

const routes = (handlers: ArticleCategoriesHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/article-categories',
    handler: handlers.postArticleCategory,
    options: {
      tags: ['api'],
      description: 'Add a new article category',
      notes: 'The name must at least have 3 chars',
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
    path: '/article-categories',
    handler: handlers.getAllArticleCategories,
    options: {
      tags: ['api'],
      description: 'Retrieve all available article categories',
      response: {
        schema: getAllResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/article-categories/{id}',
    handler: handlers.getCategoryById,
    options: {
      tags: ['api'],
      description: 'Retrieve specific article category',
      validate: {
        params: getByIdParamSchema,
      },
      response: {
        schema: getByIdResponseSchema,
      },
    },
  },
];

export default routes;
