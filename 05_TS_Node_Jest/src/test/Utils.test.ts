import { toUpperCase } from "../app/Utils";

describe("Utils test suite", (): void => {
  it("Should return correct upperCase", (): void => {
    const result = toUpperCase("abc");
    expect(result).toBe("ABC");
  });
});
