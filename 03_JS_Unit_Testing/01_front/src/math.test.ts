import { it, expect, test, describe } from "vitest";

import { add } from "./math";

describe("add()", (): void => {
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

  it("should yield NaN if a least one invalid number is provided", (): void => {
    const inputs = ["invalid", 1];

    const result = add(inputs);

    expect(result).toBeNaN();
  });

  it("should yield a correct sum if an array of numeric string values is provided", (): void => {
    const numbers = ["1", "2"];

    const result = add(numbers);

    const expectedResult = numbers.reduce((prevValue, curValue) => +prevValue + +curValue, 0);
    expect(result).toBe(expectedResult);
  });

  it("should yield 0 if an empty array is provided", (): void => {
    const numbers = [] as number[];

    const result: number = add(numbers);

    expect(result).toBe(0);
    expect(result).not.toBe(1);
  });

  it("should throw an error if no value is passed into the function", (): void => {
    const resultFn = (): void => {
      add();
    };
    // expect(resultFn).toThrow(); //* Not to do it!
    expect(resultFn).toThrow(/is not iterable/);
  });

  it("should throw an error if provided with multiple arguments instead of an array", (): void => {
    const num1 = 1;
    const num2 = 2;

    const resultFn = (): void => {
      add(num1, num2);
    };

    expect(resultFn).toThrow(/is not iterable/);
  });
});
