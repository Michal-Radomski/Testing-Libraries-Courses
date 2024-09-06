import { describe, it, expect } from "vitest";

import { cleanNumbers, transformToNumber } from "./numbers";

describe("transformToNumber()", (): void => {
  // it("should transform a string number to a number of type number", (): void => {
  //   const input = "1";

  //   const result = transformToNumber(input);

  //   expect(result).toBeTypeOf("number")
  //   expect(result).toBe(1);
  //   expect(result).toEqual(1);
  //   expect(result).toStrictEqual(1);
  // });

  it("should transform a string number to a number of type number", (): void => {
    const input = "1";

    const result = transformToNumber(input);

    expect(result).toBe(+input);
    expect(result).toBe(1);
  });

  it("should yield NaN for non-transformable values", (): void => {
    const input = "invalid";
    const input2 = {};

    const result = transformToNumber(input);
    const result2 = transformToNumber(input2);

    expect(result).toBeNaN();
    expect(result2).toBeNaN();
  });
});

describe("cleanNumbers()", (): void => {
  it("should return an array of number values if an array of string number values is provided", (): void => {
    const numberValues = ["1", "2"];

    const cleanedNumbers = cleanNumbers(numberValues);
    // console.log("cleanedNumbers:", cleanedNumbers);

    expect(cleanedNumbers[0]).toBeTypeOf("number");
    expect(cleanedNumbers[1]).toBeTypeOf("number");
    expect(cleanedNumbers).toEqual([1, 2]); //* toBe would fail!
    expect(cleanedNumbers).toSatisfy((arr: number[]) => arr.every((elem): elem is number => typeof elem === "number"));
  });

  it("should throw an error if an array with at least one empty string is provided", (): void => {
    const numberValues = ["", 1];

    const cleanFn = () => cleanNumbers(numberValues);

    expect(cleanFn).toThrow();
    expect(cleanFn).toThrow(/Invalid input/i);
  });
});
