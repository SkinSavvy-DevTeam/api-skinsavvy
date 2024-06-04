import ArticlesService from '../../services/postgresql/ArticlesService';
import {Request, ResponseToolkit} from '@hapi/hapi';
import {ArticlePayload} from '../../types/articles/types';
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
}
