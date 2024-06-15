import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import {nanoid} from 'nanoid';

export default class SolutionsService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  create = async (explanation: string) => {
    const id = `solution-${nanoid(10)}`;
    const newSolution = await this.prisma.solutions.create({
      data: {
        id,
        explanation,
      },
    });

    return newSolution;
  };

  selectAll = async () => {
    const solutions = await this.prisma.solutions.findMany();

    return solutions;
  };

  selectById = async (id: string) => {
    const solution = await this.prisma.solutions.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return solution;
  };
}
