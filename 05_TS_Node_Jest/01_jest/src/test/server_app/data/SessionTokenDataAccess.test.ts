import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";
import { Account } from "../../../app/server_app/model/AuthModel";
import { ObjectI } from "./UserCredentialsDataAccess.test";

const mockInsert = jest.fn();
const mockGetBy = jest.fn();
const mockUpdate = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation((): ObjectI => {
      return {
        insert: mockInsert,
        getBy: mockGetBy,
        update: mockUpdate,
      };
    }),
  };
});

const someAccount: Account = {
  id: "",
  password: "somePassword",
  userName: "someUserName",
} as Account;

describe("SessionTokenDataAccess test suite", (): void => {
  let sut: SessionTokenDataAccess;
  const fakeId = "1234";

  beforeEach((): void => {
    sut = new SessionTokenDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(global.Date, "now").mockReturnValue(0);
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(fakeId);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("should generate token for account", async (): Promise<void> => {
    mockInsert.mockResolvedValueOnce(fakeId);
    const actualTokenId = await sut.generateToken(someAccount);

    expect(actualTokenId).toBe(fakeId);
    expect(mockInsert).toHaveBeenCalledWith({
      id: "",
      userName: someAccount.userName,
      valid: true,
      expirationDate: new Date(1000 * 60 * 60),
    });
  });

  it("should invalidate token", async (): Promise<void> => {
    await sut.invalidateToken(fakeId);

    expect(mockUpdate).toHaveBeenCalledWith(fakeId, "valid", false);
  });

  it("should check valid token", async (): Promise<void> => {
    mockGetBy.mockResolvedValueOnce({ valid: true });

    const actual = (await sut.isValidToken({} as any)) as boolean;

    expect(actual).toBe(true);
  });

  it("should check invalid token", async (): Promise<void> => {
    mockGetBy.mockResolvedValueOnce({ valid: false });

    const actual = (await sut.isValidToken({} as any)) as boolean;

    expect(actual).toBe(false);
  });

  it("should check inexistent token", async (): Promise<void> => {
    mockGetBy.mockResolvedValueOnce(undefined);

    const actual = (await sut.isValidToken({} as any)) as boolean;

    expect(actual).toBe(false);
  });
});
