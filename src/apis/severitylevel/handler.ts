import SeverityLevelService from '../../services/postgresql/SeverityLevelService';
import {Request, ResponseToolkit} from '@hapi/hapi';

export class SeverityLevelHandler {
  private severityLevelService: SeverityLevelService;
  constructor(severityLevelService: SeverityLevelService) {
    this.severityLevelService = severityLevelService;
  }

  postSeverityLevel = async (request: Request, h: ResponseToolkit) => {
    const {level} = request.payload as {level?: number};

    const newLevel = await this.severityLevelService.add(level);

    return h
      .response({
        status: 'success',
        message: 'New level have been added successfully',
        data: {
          level: newLevel.level,
        },
      })
      .code(201);
  };
}
