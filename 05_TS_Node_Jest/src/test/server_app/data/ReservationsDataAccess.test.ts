import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";
import { Reservation } from "../../../app/server_app/model/ReservationModel";
import { ObjectI } from "./UserCredentialsDataAccess.test";

const mockInsert = jest.fn();
const mockGetBy = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();
const mockGetAllElements = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation((): ObjectI => {
      return {
        insert: mockInsert,
        getBy: mockGetBy,
        update: mockUpdate,
        delete: mockDelete,
        getAllElements: mockGetAllElements,
      };
    }),
  };
});

describe("ReservationsDataAccess test suite", (): void => {
  let sut: ReservationsDataAccess;

  const someId = "1234";

  const someReservation: Reservation = {
    endDate: "someEndDate",
    startDate: "someStartDate",
    id: "",
    room: "someRoom",
    user: "someUser",
  };

  beforeEach((): void => {
    sut = new ReservationsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(someId);
  });

  afterEach((): void => {
    jest.clearAllMocks();
    someReservation.id = "";
  });

  it("should return the id of newly created reservation", async (): Promise<void> => {
    mockInsert.mockResolvedValueOnce(someId);

    const actual = (await sut.createReservation(someReservation)) as string;

    expect(actual).toBe(someId);
    // expect(mockInsert).toBeCalledWith(someReservation); //* @deprecated
    expect(mockInsert).toHaveBeenCalledWith(someReservation);
  });

  it("should make the update reservation call", async (): Promise<void> => {
    await sut.updateReservation(someId, "endDate", "someOtherEndDate");

    expect(mockUpdate).toHaveBeenCalledWith(someId, "endDate", "someOtherEndDate");
  });

  it("should make the delete reservation call", async (): Promise<void> => {
    await sut.deleteReservation(someId);

    // expect(mockDelete).toBeCalledWith(someId); //* @deprecated
    expect(mockDelete).toHaveBeenCalledWith(someId);
  });

  it("should return reservation by id", async (): Promise<void> => {
    mockGetBy.mockResolvedValueOnce(someReservation);

    const actual = (await sut.getReservation(someId)) as Reservation;

    expect(actual).toEqual(someReservation);
    expect(mockGetBy).toHaveBeenCalledWith("id", someId);
  });

  it("should return all reservations", async (): Promise<void> => {
    mockGetAllElements.mockResolvedValueOnce([someReservation, someReservation]);

    const actual = (await sut.getAllReservations()) as Reservation[];

    expect(actual).toEqual([someReservation, someReservation]);
    expect(mockGetAllElements).toBeCalledTimes(1);
  });
});
