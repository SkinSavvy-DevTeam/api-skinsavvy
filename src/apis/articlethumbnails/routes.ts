import {ServerRoute} from '@hapi/hapi';
import {ArticleThumbnailsHandler} from './handler';
import {postImageHeaderSchema} from '../../validators/article-thumbnails/schema';

const routes = (handlers: ArticleThumbnailsHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/article-thumbnails',
    handler: handlers.postThumbnailHandler,
    options: {
      tags: ['api'],
      description: 'Uploads a new thumbnail image to an online storage',
      notes: 'Please use multipart/form-data',
      payload: {
        allow: 'multipart/form-data',
        parse: true,
        output: 'stream',
        maxBytes: 1048576 * 5, // Limit upload size to 5MB
        multipart: {
          output: 'stream',
        },
      },
      validate: {
        headers: postImageHeaderSchema,
      },
    },
  },
];

export default routes;
