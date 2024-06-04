import {ServerRoute} from '@hapi/hapi';
import {ArticleThumbnailsHandler} from './handler';
import {
  getAllThumbnailResponseSchema,
  getThumbnailsWithQueryByName,
  postImageHeaderSchema,
  postThumbnailResponseSchema,
} from '../../validators/article-thumbnails/schema';

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
      response: {
        schema: postThumbnailResponseSchema,
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      validate: {
        payload: postImageHeaderSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/article-thumbnails',
    handler: handlers.getAllThumbnails,
    options: {
      tags: ['api'],
      description:
        'Retrieve all thumbnails metadata. This endpoint also provides a request query. ',
      notes: 'Add a request query to get more specific result',
      response: {
        schema: getAllThumbnailResponseSchema,
      },
      validate: {
        query: getThumbnailsWithQueryByName,
      },
    },
  },
];

export default routes;
