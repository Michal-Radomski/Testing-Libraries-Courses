import { IncomingMessage, ServerResponse } from "http";

import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { Account } from "../../../app/server_app/model/AuthModel";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";

const getRequestBodyMock = jest.fn();

jest.mock("../../../app/server_app/utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

describe("LoginHandler test suite", (): void => {
  let sut: LoginHandler;

  const request = {
    method: undefined as undefined | HTTP_METHODS,
  };

  const responseMock = {
    writeHead: jest.fn(),
    write: jest.fn(),
    statusCode: 0,
  };

  const authorizerMock = {
    login: jest.fn(),
  };

  const someToken = "1234";

  const someAccount: Account = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };

  beforeEach((): void => {
    sut = new LoginHandler(
      request as IncomingMessage,
      responseMock as unknown as ServerResponse,
      authorizerMock as unknown as Authorizer
    );
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("should return token for valid accounts in requests", async (): Promise<void> => {
    request.method = HTTP_METHODS.POST;
    getRequestBodyMock.mockResolvedValueOnce(someAccount);
    authorizerMock.login.mockResolvedValueOnce(someToken);

    await sut.handleRequest();

    expect(authorizerMock.login).toHaveBeenCalledWith(someAccount.userName, someAccount.password);
    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
    expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, { "Content-Type": "application/json" });
    expect(responseMock.write).toHaveBeenCalledWith(
      JSON.stringify({
        token: someToken,
      })
    );
  });

  it("should return not found for invalid accounts in requests", async (): Promise<void> => {
    request.method = HTTP_METHODS.POST;
    getRequestBodyMock.mockResolvedValueOnce(someAccount);
    authorizerMock.login.mockResolvedValueOnce(undefined);

    await sut.handleRequest();

    expect(authorizerMock.login).toHaveBeenCalledWith(someAccount.userName, someAccount.password);
    expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
    expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("wrong username or password"));
  });

  it("should return bad request for invalid requests", async (): Promise<void> => {
    request.method = HTTP_METHODS.POST;
    getRequestBodyMock.mockResolvedValueOnce({});

    await sut.handleRequest();

    expect(authorizerMock.login).not.toHaveBeenCalled();
    expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
    expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("userName and password required"));
  });

  it("should do nothing for not supported http methods", async (): Promise<void> => {
    request.method = HTTP_METHODS.GET;
    await sut.handleRequest();

    expect(responseMock.writeHead).not.toHaveBeenCalled();
    expect(responseMock.write).not.toHaveBeenCalled();
    expect(getRequestBodyMock).not.toHaveBeenCalled();
  });
});
