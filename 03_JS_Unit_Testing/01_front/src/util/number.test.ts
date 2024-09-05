import { it, expect, describe } from "vitest";

import { transformToNumber } from "./numbers";

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
