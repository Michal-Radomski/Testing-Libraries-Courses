import { IncomingMessage, ServerResponse } from "http";

import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler";
import { Reservation } from "../../../app/server_app/model/ReservationModel";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";

const getRequestBodyMock = jest.fn();
jest.mock("../../../app/server_app/utils/Utils", () => ({
  getRequestBody: () => getRequestBodyMock(),
}));

describe("ReservationsHandler test suite", (): void => {
  let sut: ReservationsHandler;

  const request = {
    method: undefined as HTTP_METHODS | undefined,
    headers: {
      authorization: undefined as unknown,
    },
    url: undefined as unknown,
  };

  const responseMock = {
    writeHead: jest.fn(),
    write: jest.fn(),
    statusCode: 0,
  };

  const authorizerMock = {
    registerUser: jest.fn(),
    validateToken: jest.fn(),
  };

  const reservationsDataAccessMock = {
    createReservation: jest.fn(),
    getAllReservations: jest.fn(),
    getReservation: jest.fn(),
    updateReservation: jest.fn(),
    deleteReservation: jest.fn(),
  };

  const someReservation = {
    id: undefined as undefined | string,
    endDate: new Date().toDateString(),
    startDate: new Date().toDateString(),
    room: "someRoom",
    user: "someUser",
  } as Reservation;
  const someReservationId = "1234";

  beforeEach((): void => {
    sut = new ReservationsHandler(
      request as IncomingMessage,
      responseMock as unknown as ServerResponse,
      authorizerMock as unknown as Authorizer,
      reservationsDataAccessMock as unknown as ReservationsDataAccess
    );
    request.headers.authorization = "abcd";
    authorizerMock.validateToken.mockResolvedValueOnce(true);
  });

  afterEach((): void => {
    jest.clearAllMocks();
    request.url = undefined;
    responseMock.statusCode = 0;
  });

  describe("POST requests", (): void => {
    beforeEach(() => {
      request.method = HTTP_METHODS.POST;
    });

    it("should create reservation from valid request", async (): Promise<void> => {
      getRequestBodyMock.mockResolvedValueOnce(someReservation);
      reservationsDataAccessMock.createReservation.mockResolvedValueOnce(someReservationId);

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, { "Content-Type": "application/json" });
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify({ reservationId: someReservationId }));
    });

    it("should not create reservation from invalid request", async (): Promise<void> => {
      getRequestBodyMock.mockResolvedValueOnce({});

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Incomplete reservation!"));
    });

    it("should not create reservation from invalid fields in request", async (): Promise<void> => {
      const moreThanAReservation = { ...someReservation, someField: "123" };
      getRequestBodyMock.mockResolvedValueOnce(moreThanAReservation);

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Incomplete reservation!"));
    });
  });

  describe("GET requests", (): void => {
    beforeEach(() => {
      request.method = HTTP_METHODS.GET;
    });

    it("should return all reservations for /all request", async (): Promise<void> => {
      request.url = "/reservations/all";
      reservationsDataAccessMock.getAllReservations.mockResolvedValueOnce([someReservation]);

      await sut.handleRequest();

      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, { "Content-Type": "application/json" });
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify([someReservation]));
    });

    it("should return reservation for existing id", async (): Promise<void> => {
      request.url = `/reservations/${someReservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);

      await sut.handleRequest();

      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, { "Content-Type": "application/json" });
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(someReservation));
    });

    it("should return not found for non existing id", async (): Promise<void> => {
      request.url = `/reservations/${someReservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(undefined);

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(`Reservation with id ${someReservationId} not found`));
    });

    it("should return bad request if no id provided", async (): Promise<void> => {
      request.url = `/reservations`;

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Please provide an ID!"));
    });
  });

  describe("PUT requests", (): void => {
    beforeEach((): void => {
      request.method = HTTP_METHODS.PUT;
    });

    it("should return not found for non existing id", async (): Promise<void> => {
      request.url = `/reservations/${someReservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(undefined);

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(`Reservation with id ${someReservationId} not found`));
    });

    it("should return bad request if no id provided", async (): Promise<void> => {
      request.url = `/reservations`;

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Please provide an ID!"));
    });

    it("should return bad request if invalid fields are provided", async (): Promise<void> => {
      request.url = `/reservations/${someReservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);
      getRequestBodyMock.mockResolvedValueOnce({
        startDate1: "someDate",
      });

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Please provide valid fields to update!"));
    });

    it("should return bad request if no fields are provided", async (): Promise<void> => {
      request.url = `/reservations/${someReservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);
      getRequestBodyMock.mockResolvedValueOnce({});

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Please provide valid fields to update!"));
    });

    it("should update reservation with all valid fields provided", async (): Promise<void> => {
      request.url = `/reservations/${someReservationId}`;
      reservationsDataAccessMock.getReservation.mockResolvedValueOnce(someReservation);
      const updateObject = {
        startDate: "someDate1",
        endDate: "someDate2",
      };
      getRequestBodyMock.mockResolvedValueOnce(updateObject);

      await sut.handleRequest();

      expect(reservationsDataAccessMock.updateReservation).toBeCalledTimes(2);
      expect(reservationsDataAccessMock.updateReservation).toHaveBeenCalledWith(
        someReservationId,
        "startDate",
        updateObject.startDate
      );
      expect(reservationsDataAccessMock.updateReservation).toHaveBeenCalledWith(
        someReservationId,
        "endDate",
        updateObject.endDate
      );
      expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, { "Content-Type": "application/json" });
      expect(responseMock.write).toHaveBeenCalledWith(
        JSON.stringify(`Updated ${Object.keys(updateObject)} of reservation ${someReservationId}`)
      );
    });
  });

  describe("DELETE requests", (): void => {
    beforeEach(() => {
      request.method = HTTP_METHODS.DELETE;
    });

    it("should delete reservation with provided id", async (): Promise<void> => {
      request.url = `/reservations/${someReservationId}`;

      await sut.handleRequest();

      expect(reservationsDataAccessMock.deleteReservation).toHaveBeenCalledWith(someReservationId);
      expect(responseMock.statusCode).toBe(HTTP_CODES.OK);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(`Deleted reservation with id ${someReservationId}`));
    });

    it("should return bad request if no id provided", async (): Promise<void> => {
      request.url = `/reservations`;

      await sut.handleRequest();

      expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
      expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Please provide an ID!"));
    });
  });

  it("should return nothing for not authorized requests", async (): Promise<void> => {
    request.headers.authorization = "1234";
    authorizerMock.validateToken.mockReset();
    authorizerMock.validateToken.mockResolvedValueOnce(false);

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.UNAUTHORIZED);
    expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Unauthorized operation!"));
  });

  it("should return nothing if no authorization header is present", async (): Promise<void> => {
    request.headers.authorization = undefined;

    await sut.handleRequest();

    expect(responseMock.statusCode).toBe(HTTP_CODES.UNAUTHORIZED);
    expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify("Unauthorized operation!"));
  });

  it("should do nothing for not supported http methods", async (): Promise<void> => {
    request.method = "SOME-METHOD" as any;

    await sut.handleRequest();

    expect(responseMock.write).not.toHaveBeenCalled();
    expect(responseMock.writeHead).not.toHaveBeenCalled();
  });
});
