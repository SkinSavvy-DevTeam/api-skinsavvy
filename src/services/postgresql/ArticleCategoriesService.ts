import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import InvariantError from '../../exceptions/InvariantError';
import {ArticleCategoryPayload} from '../../types/article-category-payload';
import {nanoid} from 'nanoid';

export class ArticleCategoriesService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  addArticleCategory = async ({name}: ArticleCategoryPayload) => {
    const id = `article-category-${nanoid(8)}`;
    const lowername = name.toLowerCase();

    const newCategory = await prisma.articleCategories.create({
      data: {
        id,
        name: lowername,
      },
    });

    if (!newCategory.id) {
      throw new InvariantError('Failed to add new article category');
    }

    return newCategory;
  };

  retrieveArticleCategories = async () => {
    const allCategories = await prisma.articleCategories.findMany();

    return allCategories;
  };
}
