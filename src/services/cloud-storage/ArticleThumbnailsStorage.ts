import {Storage} from '@google-cloud/storage';
import {createWriteStream, unlinkSync} from 'fs';
import {nanoid} from 'nanoid';
import {join} from 'path';
import {tmpdir} from 'os';
import {Readable} from 'stream';
import {storage} from './client';
import NotFoundError from '../../exceptions/NotFoundError';

export default class ArticleThumbnailsStorage {
  private storage: Storage;
  constructor() {
    this.storage = storage;
  }

  getOrCreateBucket = async (bucketName: string) => {
    const bucket = await storage.bucket(bucketName);
    try {
      const [metadata] = await bucket.getMetadata();
      if (!metadata) {
        throw new NotFoundError(
          `Bucket ${bucketName} was not found. Creating one...`
        );
      }
      return bucket;
    } catch (error) {
      await storage.createBucket(bucketName);
      return bucket;
    }
  };

  writeFile = async (
    file: Readable,
    meta: {filename: string}
  ): Promise<{tempFilePath: string; filename: string}> => {
    const filename = `article-thumbnail-${nanoid(8)}-${meta.filename}`;
    const path = join(tmpdir(), filename);

    const fileStream = createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', err => reject(err));
      file.pipe(fileStream);
      file.on('end', () => resolve({tempFilePath: path, filename}));
    });
  };

  addObject = async (filePath: string, filename: string) => {
    const bucketName = process.env.BUCKET_NAME as string;
    const bucket = await this.getOrCreateBucket(bucketName);
    await bucket.upload(filePath, {
      destination: filename,
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    unlinkSync(filePath);

    const file = bucket.file(filename);
    const publicUrl = file.publicUrl();

    return publicUrl;
  };
}
