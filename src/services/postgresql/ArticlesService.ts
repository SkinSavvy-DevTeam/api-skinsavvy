import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import {ArticlePayload} from '../../types/articles/types';
import {ArticleCategoriesService} from './ArticleCategoriesService';
import {nanoid} from 'nanoid';

export default class ArticlesService {
  private prisma: PrismaClient;
  private categoryService: ArticleCategoriesService;
  constructor(categoryService: ArticleCategoriesService) {
    this.prisma = prisma;
    this.categoryService = categoryService;
  }

  add = async (article: ArticlePayload) => {
    const {title, body, categoryName, thumbnailId} = article;
    const id = `article-${nanoid(15)}`;
    const lowerCategory = categoryName.toLowerCase();

    const newArticle = await this.prisma.articles.create({
      data: {
        id,
        title,
        body,
        fullArticles: {
          create: {
            assignedAt: new Date(),
            category: {
              connectOrCreate: {
                where: {
                  name: lowerCategory,
                },
                create: {
                  id: this.categoryService.generateArticleCategoryId(),
                  name: lowerCategory,
                },
              },
            },
            thumbnail: {
              connect: {
                id: thumbnailId,
              },
            },
          },
        },
      },
    });

    return newArticle;
  };
}
