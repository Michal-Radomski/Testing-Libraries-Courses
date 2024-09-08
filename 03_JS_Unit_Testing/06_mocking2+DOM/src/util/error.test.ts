import { describe, expect, it } from "vitest";

import { HttpError, ValidationError } from "./errors";

describe("class HttpError", (): void => {
  it("should contain the provided status code, message and data", (): void => {
    const testStatus = 1;
    const testMessage = "Test";
    const testData = { key: "test" };

    const testError = new HttpError(testStatus, testMessage, testData) as HttpError;

    expect(testError.statusCode).toBe(testStatus);
    expect(testError.message).toBe(testMessage);
    expect(testError.data).toBe(testData);
  });

  it("should contain undefined as data if no data is provided", (): void => {
    const testStatus = 1;
    const testMessage = "Test";

    const testError = new HttpError(testStatus, testMessage) as HttpError;

    expect(testError.statusCode).toBe(testStatus);
    expect(testError.message).toBe(testMessage);
    expect(testError.data).toBeUndefined();
  });
});

describe("class ValidationError", (): void => {
  it("should contain the provided message", (): void => {
    const testMessage = "test";

    const testError = new ValidationError(testMessage) as ValidationError;

    expect(testError.message).toBe(testMessage);
  });
});
