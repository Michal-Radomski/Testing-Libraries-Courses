import * as generated from "../../app/server_app/data/IdGenerator";
import { Account } from "../../app/server_app/model/AuthModel";
import { Reservation } from "../../app/server_app/model/ReservationModel";
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

  const someReservation: Reservation = {
    id: "",
    endDate: "someEndDate",
    startDate: "someStartDate",
    room: "someRoom",
    user: "someUser",
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

  let token: string;

  it("should login a register user", async (): Promise<void> => {
    const result = (await fetch("http://localhost:8080/login", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    })) as Response;
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.token).toBeDefined();
    token = resultBody.token as string;
    // console.log("token:", token);
  });

  let createdReservationId: string;
  it("should create reservation if authorized", async (): Promise<void> => {
    const result = (await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    })) as Response;
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.reservationId).toBeDefined();
    createdReservationId = resultBody.reservationId;
  });

  it("should get reservation if authorized", async (): Promise<void> => {
    const result = (await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    })) as Response;
    const resultBody = await result.json();

    const expectedReservation: Reservation = structuredClone(someReservation);
    expectedReservation.id = createdReservationId;

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toEqual(expectedReservation);
  });

  it("should create and retrieve multiple reservations if authorized", async (): Promise<void> => {
    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });
    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });
    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const getAllResult = (await fetch(`http://localhost:8080/reservation/all`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    })) as Response;
    const resultBody = (await getAllResult.json()) as object;
    expect(getAllResult.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toHaveLength(4);
  });

  it("should update reservation if authorized", async (): Promise<void> => {
    const updateResult = (await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.PUT,
      body: JSON.stringify({
        startDate: "otherStartDate",
      }),
      headers: {
        authorization: token,
      },
    })) as Response;

    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    });
    const getRequestBody: Reservation = await getResult.json();
    expect(getRequestBody.startDate).toBe("otherStartDate");
  });

  it("should delete reservation if authorized", async (): Promise<void> => {
    const deleteResult = (await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.DELETE,
      headers: {
        authorization: token,
      },
    })) as Response;

    expect(deleteResult.status).toBe(HTTP_CODES.OK);

    const getResult = (await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    })) as Response;
    expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
  });

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

  //* npm run itest -- -u (updates snapshot)
  it("snapshot demo", async (): Promise<void> => {
    jest.spyOn(generated, "generateRandomId").mockReturnValueOnce("12345678");
    await fetch("http://localhost:8080/reservation", {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token,
      },
    });

    const getResult = (await fetch(`http://localhost:8080/reservation/12345678`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token,
      },
    })) as Response;
    const getRequestBody: Reservation = await getResult.json();

    expect(getRequestBody).toMatchSnapshot();
    expect(getRequestBody).toMatchSnapshot();
  });
});
