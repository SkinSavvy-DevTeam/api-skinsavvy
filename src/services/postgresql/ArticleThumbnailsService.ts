import {PrismaClient} from '@prisma/client';
import {nanoid} from 'nanoid';
import {prisma} from './client';

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

  getAll = async () => {
    const thumbnails = await this.prisma.articleThumbnails.findMany();

    return thumbnails;
  };
}
