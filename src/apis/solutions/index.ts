import {Server} from '@hapi/hapi';
import SolutionsService from '../../services/postgresql/SolutionsService';
import {SolutionsHandler} from './handler';
import routes from './routes';

const plugin = {
  name: 'Solutions',
  version: '1.0.0',
  register: (server: Server) => {
    const solutionsService = new SolutionsService();
    const solutionsHandler = new SolutionsHandler(solutionsService);

    server.route(routes(solutionsHandler));
  },
};

export default plugin;
