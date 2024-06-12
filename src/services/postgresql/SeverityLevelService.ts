import {PrismaClient} from '@prisma/client';
import {prisma} from './client';

export default class SeverityLevelService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  add = async (level?: number) => {
    if (!level) {
      const autoIncrementLevel = await this.prisma.levels.create({});
      return autoIncrementLevel;
    }

    const newLevel = await this.prisma.levels.create({
      data: {
        level,
      },
    });

    return newLevel;
  };

  getAll = async () => {
    const result = await this.prisma.levels.findMany();

    return result;
  };

  getByLevel = async (level: number) => {
    const result = await this.prisma.levels.findUniqueOrThrow({
      where: {
        level,
      },
    });

    return result;
  };
}
