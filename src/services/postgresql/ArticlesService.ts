import {PrismaClient} from '@prisma/client';
import {prisma} from './client';
import {ArticlePayload, ArticleQuery} from '../../types/articles/types';
import {ArticleCategoriesService} from './ArticleCategoriesService';
import {nanoid} from 'nanoid';
import {title} from 'process';

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

  retrieveAll = async (query: ArticleQuery) => {
    if (query.filterByTitle) {
      const fileteredArticle = await this.prisma.articles.findMany({
        where: {
          title: {
            contains: query.filterByTitle,
            mode: 'insensitive',
          },
        },
        select: {
          fullArticles: true,
        },
      });

      return fileteredArticle;
    }

    const articles = await this.prisma.fullArticles.findMany({
      select: {
        article: {
          select: {
            id: true,
            title: true,
            body: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        thumbnail: {
          select: {
            url: true,
          },
        },
      },
    });
    const formattedArticles = articles.map(article => ({
      id: article.article.id,
      title: article.article.title,
      body: article.article.body,
      category: article.category.name,
      url: article.thumbnail.url,
    }));
    return formattedArticles;
  };
}
