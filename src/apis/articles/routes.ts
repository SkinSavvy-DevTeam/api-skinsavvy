import {postPayloadSchema} from '../../validators/articles/schemas';
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
    },
  },
];

export default routes;
