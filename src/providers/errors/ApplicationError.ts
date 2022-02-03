export class ApplicationError extends Error {
  public statusCode: number;
  public error: string;
  constructor(message, statusCode: number) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.message = message || "Oops! Something went wrong!";

    this.statusCode = statusCode || 500;
  }
}
