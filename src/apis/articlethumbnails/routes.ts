import {ServerRoute} from '@hapi/hapi';
import {ArticleThumbnailsHandler} from './handler';

const routes = (handlers: ArticleThumbnailsHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/article-thumbnails',
    handler: handlers.postThumbnailHandler,
    options: {
      tags: ['api'],
      description: 'Uploads a new thumbnail image to an online storage',
      notes:
        'Please use multipart/form-data (file) with key name `image` and image file format such as `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.apng`, and `.avif`.',
      payload: {
        allow: 'multipart/form-data',
        parse: true,
        output: 'stream',
        maxBytes: 1048576 * 5, // Limit upload size to 5MB
        multipart: {
          output: 'stream',
        },
      },
      // validate: {
      //   payload: postImageHeaderSchema,
      // },
    },
  },
];

export default routes;
