export default class ClientError extends Error {
  public statusCode: number;
  public name: string;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}
