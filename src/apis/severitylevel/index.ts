import {Server} from '@hapi/hapi';
import {SeverityLevelHandler} from './handler';
import SeverityLevelService from '../../services/postgresql/SeverityLevelService';
import routes from './routes';

const plugin = {
  name: 'SeverityLevel',
  version: '1.0.0',
  register: (server: Server) => {
    const severityLevelService = new SeverityLevelService();
    const severityLevelHandler = new SeverityLevelHandler(severityLevelService);

    server.route(routes(severityLevelHandler));
  },
};

export default plugin;
