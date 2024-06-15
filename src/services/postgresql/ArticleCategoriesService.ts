import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import InvariantError from '../../exceptions/InvariantError';
import {ArticleCategoryPayload} from '../../types/article-category-payload';
import {nanoid} from 'nanoid';
import NotFoundError from '../../exceptions/NotFoundError';

// TODO: Rename all related codes to `Categories`

export class ArticleCategoriesService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  addArticleCategory = async ({name}: ArticleCategoryPayload) => {
    const id = `category-${nanoid(8)}`;
    const lowername = name.toLowerCase();

    const newCategory = await prisma.categories.create({
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
    const allCategories = await prisma.categories.findMany();

    return allCategories;
  };

  retrieveArticleCategoryById = async (id: string) => {
    const articleCategory = await prisma.categories.findUnique({
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
    const updatedArticleCategory = await prisma.categories.update({
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
    const deletedEntry = await prisma.categories.delete({
      where: {
        id,
      },
    });

    return deletedEntry;
  };

  generateArticleCategoryId = () => `article-category-${nanoid(8)}`;
}
