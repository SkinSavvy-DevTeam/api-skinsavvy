import {ServerRoute} from '@hapi/hapi';
import {ArticleCategoriesHandler} from './handler';
import {
  postResponseSchema,
  postPayloadSchema,
  getAllResponseSchema,
  getByIdParamSchema,
  getByIdResponseSchema,
  putByIdparamSchema,
  putByIdResponseSchema,
  putByIdPayloadSchema,
  deleteByIdParamSchema,
  deleteByIdResponseSchema,
} from '../../validators/article-category/schema';

const routes = (handlers: ArticleCategoriesHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/categories',
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
    path: '/categories',
    handler: handlers.getAllArticleCategories,
    options: {
      tags: ['api'],
      description: 'Retrieve all available categories',
      response: {
        schema: getAllResponseSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/categories/{id}',
    handler: handlers.getCategoryById,
    options: {
      tags: ['api'],
      description: 'Retrieve specific category using an id',
      validate: {
        params: getByIdParamSchema,
      },
      response: {
        schema: getByIdResponseSchema,
      },
    },
  },
  {
    method: 'PUT',
    path: '/categories/{id}',
    handler: handlers.putArticleCategoryById,
    options: {
      tags: ['api'],
      description: 'Update name of category using an id',
      validate: {
        params: putByIdparamSchema,
        payload: putByIdPayloadSchema,
      },
      response: {
        schema: putByIdResponseSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/categories/{id}',
    handler: handlers.deleteArticleCategoryById,
    options: {
      tags: ['api'],
      description: 'Delete specified category using id',
      validate: {
        params: deleteByIdParamSchema,
      },
      response: {
        schema: deleteByIdResponseSchema,
      },
    },
  },
];

export default routes;
