import SolutionsService from '../../services/postgresql/SolutionsService';
import {Request, ResponseToolkit} from '@hapi/hapi';

export class SolutionsHandler {
  private solutionService: SolutionsService;
  constructor(solutionService: SolutionsService) {
    this.solutionService = solutionService;
  }

  postSolution = async (request: Request, h: ResponseToolkit) => {
    const {explanation} = request.payload as {explanation: string};

    const newSolution = await this.solutionService.create(explanation);

    return h
      .response({
        status: 'success',
        message: 'Successfully added a new solution',
        data: {
          id: newSolution.id,
        },
      })
      .code(201);
  };
}
