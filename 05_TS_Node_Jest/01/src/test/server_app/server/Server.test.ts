import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler";
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler";
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";
import { HTTP_CODES } from "../../../app/server_app/model/ServerModel";
import { Server } from "../../../app/server_app/server/Server";

jest.mock("../../../app/server_app/auth/Authorizer");
jest.mock("../../../app/server_app/data/ReservationsDataAccess");
jest.mock("../../../app/server_app/handlers/LoginHandler");
jest.mock("../../../app/server_app/handlers/RegisterHandler");
jest.mock("../../../app/server_app/handlers/ReservationsHandler");

const requestMock = {
  url: "",
  headers: {
    "user-agent": "jest-test",
  },
};

const responseMock = {
  end: jest.fn(),
  writeHead: jest.fn(),
};

const serverMock = {
  listen: jest.fn(),
  close: jest.fn(),
};

jest.mock("http", () => ({
  createServer: (cb: Function) => {
    cb(requestMock, responseMock);
    return serverMock;
  },
}));

describe("Server test suite", (): void => {
  let sut: Server;

  beforeEach((): void => {
    sut = new Server();
    expect(Authorizer).toHaveBeenCalledTimes(1);
    expect(ReservationsDataAccess).toHaveBeenCalledTimes(1);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("should start server on port 8080 and end the request", async (): Promise<void> => {
    await sut.startServer();

    expect(serverMock.listen).toHaveBeenCalledWith(8080);

    console.log("checking response.end calls:");
    expect(responseMock.end).toHaveBeenCalled();
  });

  it("should handle register requests", async (): Promise<void> => {
    requestMock.url = "localhost:8080/register";
    const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, "handleRequest") as jest.SpyInstance<
      Promise<void>,
      [],
      any
    >;

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(RegisterHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer));
  });

  it("should handle login requests", async (): Promise<void> => {
    requestMock.url = "localhost:8080/login";
    const handleRequestSpy = jest.spyOn(LoginHandler.prototype, "handleRequest") as jest.SpyInstance<Promise<void>, [], any>;

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(LoginHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer));
  });

  it("should handle reservation requests", async (): Promise<void> => {
    requestMock.url = "localhost:8080/reservation";
    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, "handleRequest") as jest.SpyInstance<
      Promise<void>,
      [],
      any
    >;

    await sut.startServer();

    expect(handleRequestSpy).toHaveBeenCalledTimes(1);
    expect(ReservationsHandler).toHaveBeenCalledWith(
      requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    );
  });

  it("should do nothing for not supported routes", async (): Promise<void> => {
    requestMock.url = "localhost:8080/someRandomRoute";
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, "validateToken") as jest.SpyInstance<
      Promise<boolean>,
      [tokenId: string],
      any
    >;

    await sut.startServer();

    expect(validateTokenSpy).not.toHaveBeenCalled();
  });

  it("should handle errors in serving requests", async (): Promise<void> => {
    requestMock.url = "localhost:8080/reservation";
    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, "handleRequest") as jest.SpyInstance<
      Promise<void>,
      [],
      any
    >;
    handleRequestSpy.mockRejectedValueOnce(new Error("Some error"));

    await sut.startServer();

    expect(responseMock.writeHead).toHaveBeenCalledWith(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      JSON.stringify(`Internal server error: Some error`)
    );
  });

  it("should stop the server if started", async (): Promise<void> => {
    serverMock.close.mockImplementationOnce((cb: Function) => {
      cb();
    });

    await sut.startServer();

    await sut.stopServer();

    expect(serverMock.close).toHaveBeenCalledTimes(1);
  });

  it("should forward error while stopping server", async (): Promise<void> => {
    serverMock.close.mockImplementationOnce((cb: Function) => {
      cb(new Error("Error while closing server!"));
    });

    await sut.startServer();

    expect(async (): Promise<void> => {
      await sut.stopServer();
    }).rejects.toThrow("Error while closing server!");

    expect(serverMock.close).toHaveBeenCalledTimes(1);
  });
});
