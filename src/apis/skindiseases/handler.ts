import {Request, ResponseToolkit} from '@hapi/hapi';
import SkinDiseasesService from '../../services/postgresql/SkinDiseasesService';
import {SkinDiseasesPayload} from '../../types/skindiseases/payload';
import {request} from 'http';

export class SkinDiseasesHandler {
  private service: SkinDiseasesService;
  constructor(service: SkinDiseasesService) {
    this.service = service;
  }

  postSkinDisease = async (request: Request, h: ResponseToolkit) => {
    const {name} = request.payload as SkinDiseasesPayload;
    const result = await this.service.add(name);

    return h.response({
      status: 'success',
      data: {
        id: result.id,
        name: result.name,
      },
    });
  };

  getAllSkinDiseases = async (request: Request, h: ResponseToolkit) => {
    const result = await this.service.getAll();

    return h.response({
      status: 'success',
      data: {
        skinDiseases: result,
      },
    });
  };

  getSkinDiseaseById = async (request: Request, h: ResponseToolkit) => {
    const {id} = request.params;
    const result = await this.service.getById(id);

    return h.response({
      status: 'success',
      data: {
        skinDisease: result,
      },
    });
  };
}
