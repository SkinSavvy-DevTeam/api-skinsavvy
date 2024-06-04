import ArticlesService from '../../services/postgresql/ArticlesService';
import {Request, ResponseToolkit} from '@hapi/hapi';
import {
  ArticleIdPathParameter,
  ArticlePayload,
  ArticleQuery,
} from '../../types/articles/types';
import ArticleThumbnailsService from '../../services/postgresql/ArticleThumbnailsService';

export class ArticlesHandler {
  private articleService: ArticlesService;
  private articleThumbnailService: ArticleThumbnailsService;
  constructor(
    articleService: ArticlesService,
    articleThumbnailService: ArticleThumbnailsService
  ) {
    this.articleService = articleService;
    this.articleThumbnailService = articleThumbnailService;
  }

  postArticle = async (request: Request, h: ResponseToolkit) => {
    const payload = request.payload as ArticlePayload;
    const {thumbnailId} = payload;

    await this.articleThumbnailService.verifyThumbnailExist(thumbnailId);

    const newArticle = await this.articleService.add(payload);

    return h
      .response({
        status: 'success',
        message: 'Successfully added new article',
        data: {
          id: newArticle.id,
          title: newArticle.title,
        },
      })
      .code(201);
  };

  getAllArticles = async (request: Request, h: ResponseToolkit) => {
    const query = request.query as ArticleQuery;
    const articles = await this.articleService.retrieveAll(query);
    return h.response({
      status: 'success',
      message: 'Successfully retrieved all matched articles',
      data: {
        articles,
      },
    });
  };

  getArticleById = async (request: Request, h: ResponseToolkit) => {
    const {id} = request.params as ArticleIdPathParameter;

    const article = await this.articleService.retrieveById(id);

    return h.response({
      status: 'success',
      message: `Successfully retrieve article with id ${article.id}`,
      data: {
        article,
      },
    });
  };
}
