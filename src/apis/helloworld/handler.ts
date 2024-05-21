import {Request, ResponseToolkit} from '@hapi/hapi';

export default class HelloHandler {
  private name: string;
  constructor(name = 'World') {
    this.name = name;
  }

  getHelloWorldHandler = (request: Request, h: ResponseToolkit) => {
    return h.response({
      status: 'success',
      message: `Hello, ${this.name}`,
    });
  };
}
