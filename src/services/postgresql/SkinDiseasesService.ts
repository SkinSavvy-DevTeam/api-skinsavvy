import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import {nanoid} from 'nanoid';
import NotFoundError from '../../exceptions/NotFoundError';

export default class SkinDiseasesService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  add = async (name: string) => {
    const id = `skin-disease-${nanoid(20)}`;

    const newEntry = await this.prisma.skinDiseases.create({
      data: {
        id,
        name,
      },
    });

    return newEntry;
  };

  getAll = async () => {
    const result = await this.prisma.skinDiseases.findMany();

    return result;
  };

  getById = async (id: string) => {
    const result = await this.prisma.skinDiseases.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      throw new NotFoundError(`Resource with id of ${id} was not found`);
    }

    return result;
  };
}
