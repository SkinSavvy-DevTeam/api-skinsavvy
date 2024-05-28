import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import {nanoid} from 'nanoid';

export default class SkinDiseasesService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  addSkinDisease = async (name: string) => {
    const id = `skin-disease-${nanoid(20)}`;

    const newEntry = await this.prisma.skinDiseases.create({
      data: {
        id,
        name,
      },
    });

    return newEntry;
  };
}
