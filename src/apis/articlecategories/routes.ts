import {ServerRoute} from '@hapi/hapi';
import {ArticleCategoriesHandler} from './handler';
import {
  ArticleCategoryResponseSchema,
  ArticleCategorySchema,
} from '../../validators/article-category/schema';

const routes = (handlers: ArticleCategoriesHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/article-categories',
    handler: handlers.postArticleCategory,
    options: {
      tags: ['api'],
      description: 'Add a new article category',
      validate: {
        payload: ArticleCategorySchema,
      },
      response: {
        schema: ArticleCategoryResponseSchema,
      },
    },
  },
];

export default routes;
