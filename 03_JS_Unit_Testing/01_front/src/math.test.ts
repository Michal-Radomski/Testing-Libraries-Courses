import { it, expect, test } from "vitest";

import { add } from "./math";

//* it = test in Jest and Vitest
it("should summarize all number values in an array v1", (): void => {
  const result = add([1, 2, 3, 4]) as number;
  expect(result).toBe(10);
});

test("should summarize all number values in an array v2", (): void => {
  const result = add([1, 2, 3, 4]) as number;
  expect(result).toBe(10);
});

//* AAA Pattern
it("should summarize all number values in an array v3", (): void => {
  // Arrange
  const numbers = [1, 2, 3, 4];
  // Act
  const result: number = add(numbers);
  // Assert
  const expectedResult: number = numbers.reduce((prevValue, curValue) => prevValue + curValue, 0);
  expect(result).toBe(expectedResult);
});
