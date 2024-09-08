import { it, expect, describe } from "vitest";

import { validateNotEmpty } from "./validation";

describe("validation.ts", (): void => {
  const testErrorMessage: string = "Error Message";

  it("should throw an error if an empty string is provided as a value", (): void => {
    const testInput = "";

    const validationFn = (): void => validateNotEmpty(testInput, testErrorMessage);

    expect(validationFn).toThrow();
  });

  it("should throw an error if an empty string is provided as a value", (): void => {
    const testInput = "  ";

    const validationFn = (): void => validateNotEmpty(testInput, testErrorMessage);

    expect(validationFn).toThrow();
  });

  it("should throw an error with the provided error message", (): void => {
    const testInput = "";

    const validationFn = (): void => validateNotEmpty(testInput, testErrorMessage);

    expect(validationFn).toThrow(testErrorMessage);
  });
});
