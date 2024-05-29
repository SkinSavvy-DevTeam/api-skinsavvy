import {Server} from '@hapi/hapi';
import SkinDiseasesService from '../../services/postgresql/SkinDiseasesService';
import {SkinDiseasesHandler} from './handler';
import routes from './routes';

const plugin = {
  name: 'SkinDisease',
  version: '1.0.0',
  register: (server: Server) => {
    const skinDiseasesService = new SkinDiseasesService();
    const skinDiseasesHandler = new SkinDiseasesHandler(skinDiseasesService);

    server.route(routes(skinDiseasesHandler));
  },
};

export default plugin;
