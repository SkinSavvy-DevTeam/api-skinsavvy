import {ServerRoute} from '@hapi/hapi';
import {ArticleCategoriesHandler} from './handler';
import {
  postArticleCategoryResponseSchema,
  postArticleCategoryPayloadSchema,
  getAllArticleCategoriesResponseSchema,
  getArticleCategoryByIdParam,
  getArticleCategoryByIdResponseSchema,
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
        payload: postArticleCategoryPayloadSchema,
      },
      response: {
        schema: postArticleCategoryResponseSchema,
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
        schema: getAllArticleCategoriesResponseSchema,
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
        params: getArticleCategoryByIdParam,
      },
      response: {
        schema: getArticleCategoryByIdResponseSchema,
      },
    },
  },
];

export default routes;
