import ArticleThumbnailsStorage from '../../services/cloud-storage/ArticleThumbnailsStorage';
import {Request, ResponseToolkit} from '@hapi/hapi';
import ArticleThumbnailsService from '../../services/postgresql/ArticleThumbnailsService';
import {ArticleThumbnailQuery} from '../../types/skinthumbnails/query';

export class ArticleThumbnailsHandler {
  private storageService: ArticleThumbnailsStorage;
  private databaseService: ArticleThumbnailsService;
  constructor(
    storageService: ArticleThumbnailsStorage,
    databaseService: ArticleThumbnailsService
  ) {
    this.storageService = storageService;
    this.databaseService = databaseService;
  }

  postThumbnailHandler = async (request: Request, h: ResponseToolkit) => {
    const {image: file} = request.payload as any;
    const meta = file.hapi;

    const {tempFilePath, filename} = await this.storageService.writeFile(
      file,
      meta
    );

    const publicUrl = await this.storageService.addObject(
      tempFilePath,
      filename
    );

    const result = await this.databaseService.add(filename, publicUrl);

    return h
      .response({
        status: 'success',
        message: 'Thumbnail uploaded successfully',
        data: {
          thumbnail: result,
        },
      })
      .code(201);
  };

  getAllThumbnails = async (request: Request, h: ResponseToolkit) => {
    const query = request.query as ArticleThumbnailQuery;
    const thumbnails = await this.databaseService.getAll(query);

    return h.response({
      status: 'success',
      message: 'All thumbnails metadata successfully retrieved',
      data: {
        thumbnails,
      },
    });
  };
}
