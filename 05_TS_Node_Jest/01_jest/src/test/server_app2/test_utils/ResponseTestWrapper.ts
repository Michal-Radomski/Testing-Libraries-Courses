import { HTTP_CODES } from "../../../app/server_app/model/ServerModel";

export class ResponseTestWrapper {
  public statusCode: HTTP_CODES | undefined;
  public headers = new Array<object>();
  public body: object | undefined;

  public writeHead(statusCode: HTTP_CODES, header: object): void {
    this.statusCode = statusCode;
    this.headers.push(header);
  }

  public write(stringifiedBody: string): void {
    this.body = JSON.parse(stringifiedBody);
  }

  public end(): void {}

  public clearFields(): void {
    this.statusCode = undefined;
    this.body = undefined;
    this.headers.length = 0;
  }
}
