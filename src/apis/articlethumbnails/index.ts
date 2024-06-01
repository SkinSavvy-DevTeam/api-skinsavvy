import {Server} from '@hapi/hapi';
import {ArticleThumbnailsHandler} from './handler';
import ArticleThumbnailsStorage from '../../services/cloud-storage/ArticleThumbnailsStorage';
import ArticleThumbnailsService from '../../services/postgresql/ArticleThumbnailsService';
import routes from './routes';

const plugin = {
  name: 'ArticleThumbnails',
  version: '1.0.0',
  register: (server: Server) => {
    const bucketName = process.env.BUCKET_NAME as string;

    const storageService = new ArticleThumbnailsStorage(bucketName);
    const databaseService = new ArticleThumbnailsService();
    const articleThumbnailsHandler = new ArticleThumbnailsHandler(
      storageService,
      databaseService
    );

    server.route(routes(articleThumbnailsHandler));
  },
};

export default plugin;
