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
  private bucketName: string;
  constructor(bucketName: string) {
    this.storage = storage;
    this.bucketName = bucketName;
  }

  private getOrCreateBucket = async () => {
    const bucket = await storage.bucket(this.bucketName);
    try {
      const [metadata] = await bucket.getMetadata();
      if (!metadata) {
        throw new NotFoundError(
          `Bucket ${this.bucketName} was not found. Creating one...`
        );
      }
      return bucket;
    } catch (error) {
      await storage.createBucket(this.bucketName);
      return bucket;
    }
  };

  writeFile = async (
    file: Readable,
    meta: {filename: string}
  ): Promise<{tempFilePath: string; filename: string}> => {
    const filename = `thumbnail-${nanoid(8)}-${meta.filename}`;
    const path = join(tmpdir(), filename);

    const fileStream = createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', err => reject(err));
      file.pipe(fileStream);
      file.on('end', () => resolve({tempFilePath: path, filename}));
    });
  };

  addObject = async (filePath: string, filename: string) => {
    // TODO: Refactor this bucket fetching method
    const bucket = await this.getOrCreateBucket();

    await bucket.upload(filePath, {
      destination: filename,
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    // Delete the temporary path
    unlinkSync(filePath);

    const file = bucket.file(filename);
    const publicUrl = file.publicUrl();

    return publicUrl;
  };
}
