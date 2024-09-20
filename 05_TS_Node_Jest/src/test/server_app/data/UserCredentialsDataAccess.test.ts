import { DataBase } from "./../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn() as jest.Mock<any, any, any>;
const getByMock = jest.fn() as jest.Mock<any, any, any>;

export interface ObjectI {
  [key: string]: jest.Mock<any, any, any>;
}

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation((): ObjectI => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("UserCredentialsDataAccess test suite", (): void => {
  let sut: UserCredentialsDataAccess;

  const someAccount: Account = {
    id: "",
    password: "somePassword",
    userName: "someUserName",
  };

  const someId = "1234";

  beforeEach((): void => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("should add user and return the id", async (): Promise<void> => {
    insertMock.mockResolvedValueOnce(someId); //* With async code!

    const actualId = (await sut.addUser(someAccount)) as string;

    expect(actualId).toBe(someId);
    expect(insertMock).toHaveBeenCalledWith(someAccount);
  });

  it("should get user by id", async (): Promise<void> => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualUser = (await sut.getUserById(someId)) as Account;

    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith("id", someId);
  });

  it("should get user by name", async (): Promise<void> => {
    getByMock.mockResolvedValueOnce(someAccount);

    const actualUser = (await sut.getUserByUserName(someAccount.userName)) as Account;

    expect(actualUser).toEqual(someAccount);
    expect(getByMock).toHaveBeenCalledWith("userName", someAccount.userName);
  });
});
