import {PrismaClient} from '@prisma/client';
import {prisma} from './client';

export default class SeverityLevelSolutionService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  create = async (levelId: string, solutionId: string) => {
    const severitySolution = await this.prisma.levelsSolutions.create({
      data: {
        solutionId,
        levelId,
      },
      include: {
        solution: true,
        level: true,
      },
    });

    const result = {
      solution: severitySolution.solution,
      level: severitySolution.level,
    };

    return result;
  };

  selectAll = async () => {
    const severitySolutions = await this.prisma.levelsSolutions.findMany({
      select: {
        solution: true,
        level: true,
      },
    });

    return severitySolutions;
  };

  selectByLevel = async (level: number) => {
    const severitySolution = await this.prisma.levels.findUniqueOrThrow({
      where: {
        level,
      },
      include: {
        LevelsSolutions: {
          include: {
            solution: true,
            level: true,
          },
        },
      },
    });

    const result = {
      solution: severitySolution.LevelsSolutions[0].solution,
      level: severitySolution.LevelsSolutions[0].level,
    };

    return result;
  };
}
