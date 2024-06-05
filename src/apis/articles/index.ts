import {Server} from '@hapi/hapi';
import ArticlesService from '../../services/postgresql/ArticlesService';
import {ArticleCategoriesService} from '../../services/postgresql/ArticleCategoriesService';
import {ArticlesHandler} from './handler';
import ArticleThumbnailsService from '../../services/postgresql/ArticleThumbnailsService';
import routes from './routes';

const plugin = {
  name: 'Articles',
  version: '1.0.0',
  register: (server: Server) => {
    const articleCategoriesService = new ArticleCategoriesService();
    const articleThumbnailService = new ArticleThumbnailsService();
    const articlesService = new ArticlesService(articleCategoriesService);
    const articlesHandler = new ArticlesHandler(
      articlesService,
      articleThumbnailService
    );

    server.route(routes(articlesHandler));
  },
};

export default plugin;
