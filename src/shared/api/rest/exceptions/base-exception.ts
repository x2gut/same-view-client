export class BaseApiError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name="BaseApiError"
  }
}
