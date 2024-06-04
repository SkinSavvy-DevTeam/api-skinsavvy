import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import InvariantError from '../../exceptions/InvariantError';
import {ArticleCategoryPayload} from '../../types/article-category-payload';
import {nanoid} from 'nanoid';
import NotFoundError from '../../exceptions/NotFoundError';

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

  retrieveArticleCategoryById = async (id: string) => {
    const articleCategory = await prisma.articleCategories.findUnique({
      where: {
        id,
      },
    });

    if (!articleCategory) {
      throw new NotFoundError(`Article category with id ${id} was not found`);
    }

    return articleCategory;
  };

  updateArticleCategoryById = async (id: string, name: string) => {
    const updatedArticleCategory = await prisma.articleCategories.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return updatedArticleCategory;
  };

  deleteArticleCategoryById = async (id: string) => {
    const deletedEntry = await prisma.articleCategories.delete({
      where: {
        id,
      },
    });

    return deletedEntry;
  };

  generateArticleCategoryId = () => `article-category-${nanoid(8)}`;
}
