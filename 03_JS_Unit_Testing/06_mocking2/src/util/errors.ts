export class HttpError {
  statusCode: number;
  message: string;
  data?: { key: string };
  constructor(statusCode: number, message: string, data?: { key: string }) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export class ValidationError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
