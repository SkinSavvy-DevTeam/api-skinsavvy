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
        include: {
          fullArticles: {
            include: {
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
          },
        },
      });

      const formattedArticles = fileteredArticle.map(article => ({
        id: article.id,
        title: article.title,
        body: article.body,
        category: article.fullArticles[0].category.name,
        thumbnailUrl: article.fullArticles[0].thumbnail.url,
      }));

      return formattedArticles;
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
      thumbnailUrl: article.thumbnail.url,
    }));
    return formattedArticles;
  };

  retrieveById = async (id: string) => {
    const article = await this.prisma.articles.findMany({
      where: {
        id,
      },
      include: {
        fullArticles: {
          include: {
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
        },
      },
    });

    const [formattedArticle] = article.map(a => ({
      id: a.id,
      title: a.title,
      body: a.body,
      category: a.fullArticles[0].category.name,
      thumbnailUrl: a.fullArticles[0].thumbnail.url,
    }));

    return formattedArticle;
  };
}
