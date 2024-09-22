import { Account } from "../../app/server_app/model/AuthModel";
import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";
import { AwesomeRequestResponse, makeAwesomeRequest } from "./utils/http-client";

describe("Server app integration tests", (): void => {
  let server: Server;

  beforeAll((): void => {
    server = new Server();
    server.startServer();
  });

  afterAll(async (): Promise<void> => {
    await server.stopServer();
  });

  const someUser: Account = {
    id: "",
    userName: "someUserName",
    password: "somePassword",
  };

  it("should register new user", async (): Promise<void> => {
    const result = (await fetch("http://localhost:8080/register", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    })) as Response;
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
  });

  it("should register new user with awesomeRequest", async (): Promise<void> => {
    const result = (await makeAwesomeRequest(
      {
        host: "localhost",
        port: 8080,
        method: HTTP_METHODS.POST,
        path: "/register",
      },
      someUser
    )) as AwesomeRequestResponse;

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });
});
