jest.mock("../../app/doubles/OtherUtils", () => ({
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: () => {
    return 10;
  },
}));

jest.mock("uuid", () => ({
  v4: () => "123",
}));

// jest.mock("uuid", () => {
//   return {
//     v4: () => "123",
//   };
// });

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("module tests", (): void => {
  test("calculate complexity", (): void => {
    const result = OtherUtils.calculateComplexity({} as any);
    expect(result).toBe(10);
  });

  test("keep other functions", (): void => {
    const result = OtherUtils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  test("string with id", (): void => {
    const result = OtherUtils.toLowerCaseWithId("ABC");
    // console.log("result:", result);
    expect(result).toBe("abc123");
  });
});
