import { expect, it } from "vitest";

import { generateToken, generateTokenPromise } from "./async-example";

it("should generate a token value", (done): void => {
  const testUserEmail = "test@test.com";

  generateToken(testUserEmail, (_err, token) => {
    // expect(token).toBeDefined();

    try {
      expect(token).toBeDefined();
      // expect(token).toBe(2);
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

it("should generate a token value", async (): Promise<void> => {
  const testUserEmail = "test@test.com";

  const token = (await generateTokenPromise(testUserEmail)) as string;

  expect(token).toBeDefined();
});
