import {Request, ResponseToolkit} from '@hapi/hapi';
import {ArticleCategoriesService} from '../../services/postgresql/ArticleCategoriesService';
import {ArticleCategoryPayload} from '../../types/article-category-payload';

export class ArticleCategoriesHandler {
  private service: ArticleCategoriesService;
  constructor(service: ArticleCategoriesService) {
    this.service = service;
  }

  postArticleCategory = async (request: Request, h: ResponseToolkit) => {
    const payload = request.payload as ArticleCategoryPayload;
    const {id, name} = await this.service.addArticleCategory(payload);

    return h.response({
      status: 'success',
      message: 'New category added successfully',
      data: {
        id,
        name,
      },
    });
  };

  getAllArticleCategories = async (request: Request, h: ResponseToolkit) => {
    const articleCategories = await this.service.retrieveArticleCategories();

    return h.response({
      status: 'success',
      data: {
        articleCategories,
      },
    });
  };
}
