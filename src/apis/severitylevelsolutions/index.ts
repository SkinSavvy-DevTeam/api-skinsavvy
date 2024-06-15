import {Server} from '@hapi/hapi';
import SeverityLevelSolutionService from '../../services/postgresql/SeverityLevelSolutionService';
import {SeverityLevelSolutionsHandler} from './handler';
import routes from './routes';

const plugin = {
  name: 'Severity Level Solutions',
  version: '1.0.0',
  register: (server: Server) => {
    const severityLevelSolutionService = new SeverityLevelSolutionService();
    const severityLevelSolutionHandler = new SeverityLevelSolutionsHandler(
      severityLevelSolutionService
    );

    server.route(routes(severityLevelSolutionHandler));
  },
};

export default plugin;
