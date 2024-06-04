import {PrismaClient} from '@prisma/client';
import {nanoid} from 'nanoid';
import {prisma} from './client';
import {ArticleThumbnailQuery} from '../../types/skinthumbnails/query';

export default class ArticleThumbnailsService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  add = async (filename: string, url: string) => {
    const id = `article-thumbnail-${nanoid(8)}`;
    const thumbnail = await this.prisma.articleThumbnails.create({
      data: {
        id,
        filename,
        url,
      },
    });

    return thumbnail;
  };

  getAll = async ({filterByName}: ArticleThumbnailQuery) => {
    if (filterByName) {
      const filteredThumbnails = await this.prisma.articleThumbnails.findMany({
        where: {
          filename: {
            contains: filterByName,
          },
        },
      });

      return filteredThumbnails;
    }
    const thumbnails = await this.prisma.articleThumbnails.findMany();

    return thumbnails;
  };

  verifyThumbnailExist = async (id: string) => {
    await this.prisma.articleThumbnails.findUniqueOrThrow({
      where: {
        id,
      },
    });
  };
}
