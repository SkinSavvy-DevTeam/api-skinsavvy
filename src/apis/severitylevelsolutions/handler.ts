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

  getAllSeveritySolution = async (request: Request, h: ResponseToolkit) => {
    const severityLevelSolutions =
      await this.severitySolutionService.selectAll();
    return h.response({
      status: 'success',
      message: 'Successfully retrieve all solutions and level',
      data: {
        severityLevelSolutions,
      },
    });
  };

  getByLevel = async (request: Request, h: ResponseToolkit) => {
    const {level} = request.params as {level: number};
    const severityLevelSolution =
      await this.severitySolutionService.selectByLevel(level);

    return h.response({
      status: 'success',
      message: 'Successfully retrieve solution with specified severity level',
      data: {
        severityLevelSolution,
      },
    });
  };
}
