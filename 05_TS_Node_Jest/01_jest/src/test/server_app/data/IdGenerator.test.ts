import { generateRandomId } from "../../../app/server_app/data/IdGenerator";

describe("IdGenerator test suite", (): void => {
  it("should return a random string", (): void => {
    const randomId: string = generateRandomId();
    // console.log("randomId:", randomId);
    expect(randomId.length).toBe(20);
  });
});
