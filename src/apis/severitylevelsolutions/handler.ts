import SeverityLevelSolutionService from '../../services/postgresql/SeverityLevelSolutionService';
import {Request, ResponseToolkit} from '@hapi/hapi';

export class SeverityLevelSolutionsHandler {
  private severitySolutionService: SeverityLevelSolutionService;
  constructor(severityLevelSolutionsService: SeverityLevelSolutionService) {
    this.severitySolutionService = severityLevelSolutionsService;
  }

  postSeveritySolution = async (request: Request, h: ResponseToolkit) => {
    const {levelId, solutionId} = request.payload as {
      solutionId: string;
      levelId: string;
    };

    const {solution, level} = await this.severitySolutionService.create(
      levelId,
      solutionId
    );

    return h
      .response({
        status: 'success',
        message: 'Successfully added new solution for specified level',
        data: {
          solution,
          level,
        },
      })
      .code(201);
  };
}
