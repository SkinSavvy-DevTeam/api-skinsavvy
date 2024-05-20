import * as Hapi from '@hapi/hapi';

export class Server {
  private server: Hapi.Server;

  constructor() {
    this.server = Hapi.server({
      port: process.env.PORT || 3821,
      host: process.env.HOST || '0.0.0.0',
      routes: {
        cors: {
          origin: ['*'],
        },
      },
    });
  }

  async start(): Promise<void> {
    console.info(`Server is listening on ${this.server.info.uri}`);
    this.server.start();
  }
}
