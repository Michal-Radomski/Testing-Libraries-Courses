import { Authorizer } from "../../../app/server_app/auth/Authorizer";
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";

// SessionTokenDataAccess mocks:
const isValidTokenMock = jest.fn();
const generateTokenMock = jest.fn();
const invalidateTokenMock = jest.fn();
jest.mock("../../../app/server_app/data/SessionTokenDataAccess", () => {
  return {
    SessionTokenDataAccess: jest.fn().mockImplementation(() => {
      return {
        isValidToken: isValidTokenMock,
        generateToken: generateTokenMock,
        invalidateToken: invalidateTokenMock,
      };
    }),
  };
});

// UserCredentialsDataAccess mocks:
const addUserMock = jest.fn();
const getUserByUserNameMock = jest.fn();
jest.mock("../../../app/server_app/data/UserCredentialsDataAccess", () => {
  return {
    UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
      return {
        addUser: addUserMock,
        getUserByUserName: getUserByUserNameMock,
      };
    }),
  };
});

describe("Authorizer test suite", (): void => {
  let sut: Authorizer;

  const someId = "1234";
  const someUserName = "someUserName";
  const somePassword = "somePassword";

  beforeEach((): void => {
    sut = new Authorizer();
    expect(SessionTokenDataAccess).toHaveBeenCalledTimes(1);
    expect(UserCredentialsDataAccess).toHaveBeenCalledTimes(1);
  });

  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("should validate token", async (): Promise<void> => {
    isValidTokenMock.mockResolvedValueOnce(false);

    const actual: boolean = await sut.validateToken(someId);

    expect(actual).toBe(false);
  });

  it("should return id for new registered user", async (): Promise<void> => {
    addUserMock.mockResolvedValueOnce(someId);

    const actual: string = await sut.registerUser(someUserName, somePassword);

    expect(actual).toBe(someId);
    expect(addUserMock).toHaveBeenCalledWith({
      id: "",
      password: somePassword,
      userName: someUserName,
    });
  });

  it("should return tokenId for valid credentials", async (): Promise<void> => {
    getUserByUserNameMock.mockResolvedValueOnce({
      password: somePassword,
    });
    generateTokenMock.mockResolvedValueOnce(someId);

    const actual = (await sut.login(someUserName, somePassword)) as string;

    expect(actual).toBe(someId);
  });

  it("should return undefined for invalid credentials", async (): Promise<void> => {
    getUserByUserNameMock.mockResolvedValueOnce({
      password: somePassword,
    });
    generateTokenMock.mockResolvedValueOnce(someId);

    const actual = (await sut.login(someUserName, "someOtherPassword")) as string;

    expect(actual).toBeUndefined();
  });

  it("should invalidate token on logout call", async (): Promise<void> => {
    await sut.logout(someId);

    expect(invalidateTokenMock).toHaveBeenCalledWith(someId);
  });
});
