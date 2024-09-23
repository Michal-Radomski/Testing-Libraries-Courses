import { WithId } from "mongodb";

import { UsersAccess } from "../app/UsersAccess";
import { User } from "../app/UsersModel";

describe("UsersAccess test suite", (): void => {
  let usersAccess: UsersAccess;

  const someUser: User = {
    name: "Some User",
    position: "Engineer",
    employedAt: new Date(),
  };

  beforeAll(async (): Promise<void> => {
    usersAccess = new UsersAccess();
    await usersAccess.connectToDb();
  });

  let userId: string;
  test("insert a user", async (): Promise<void> => {
    userId = await usersAccess.addUser(someUser);
    const a = 5;
  });

  test("find user", async (): Promise<void> => {
    const retrievedUser: WithId<User> = await usersAccess.getUser(userId);
    const a = 5;
    expect(retrievedUser).toEqual(someUser);
  });

  afterAll(async (): Promise<void> => {
    await usersAccess.closeConnection();
  });
});
