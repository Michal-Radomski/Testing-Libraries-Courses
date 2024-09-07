import { DoneCallback, expect, it } from "vitest";

import { generateToken, generateTokenPromise } from "./async-example";

it("should generate a token value", (done: DoneCallback): void => {
  const testUserEmail = "test@test.com";

  generateToken(testUserEmail, (_err, token) => {
    // expect(token).toBeDefined();

    try {
      expect(token).toBeDefined();
      done();
    } catch (err) {
      done(err);
    }
  });
});

it("should generate a token value", (): void => {
  const testUserEmail = "test@test.com";

  expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
});

//* Easier way
it("should generate a token value", async (): Promise<void> => {
  const testUserEmail = "test@test.com";

  const token = (await generateTokenPromise(testUserEmail)) as string;

  expect(token).toBeDefined();
});
