import {Server} from '@hapi/hapi';
import {ArticleCategoriesHandler} from './handler';
import {ArticleCategoriesService} from '../../services/postgresql/ArticleCategoriesService';
import routes from './routes';

const plugin = {
  name: 'ArticleCategory',
  version: '1.0.0',
  register: (server: Server) => {
    const articleCategoriesService = new ArticleCategoriesService();
    const articleCategoriesHandler = new ArticleCategoriesHandler(
      articleCategoriesService
    );

    server.route(routes(articleCategoriesHandler));
  },
};

export default plugin;
