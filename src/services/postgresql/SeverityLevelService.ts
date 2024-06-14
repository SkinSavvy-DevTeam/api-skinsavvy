import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import {nanoid} from 'nanoid';

export default class SeverityLevelService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  add = async (name: string, level: number) => {
    const id = `level-${nanoid(8)}`;

    const newLevel = await this.prisma.levels.create({
      data: {
        id,
        name,
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
