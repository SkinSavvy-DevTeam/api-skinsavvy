import {Request, ResponseToolkit} from '@hapi/hapi';
import SkinDiseasesService from '../../services/postgresql/SkinDiseasesService';
import {SkinDiseasesPayload} from '../../types/skindiseases/payload';

export class SkinDiseasesHandler {
  private service: SkinDiseasesService;
  constructor(service: SkinDiseasesService) {
    this.service = service;
  }

  postSkinDisease = async (request: Request, h: ResponseToolkit) => {
    const {name} = request.payload as SkinDiseasesPayload;
    const result = await this.service.addSkinDisease(name);

    return h.response({
      status: 'success',
      data: {
        id: result.id,
        name: result.name,
      },
    });
  };
}
