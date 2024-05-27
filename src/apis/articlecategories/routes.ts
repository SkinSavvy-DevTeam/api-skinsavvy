import {ServerRoute} from '@hapi/hapi';
import {ArticleCategoriesHandler} from './handler';
import {
  postArticleCategoryResponseSchema,
  postArticleCategoryPayloadSchema,
  getAllArticleCategoriesResponseSchema,
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
];

export default routes;
