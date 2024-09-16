import { toUpperCase } from "../app/Utils";

describe("Utils test suite", (): void => {
  it("Should return correct upperCase", (): void => {
    // Arrange
    const sut = toUpperCase;
    const expected = "ABC";

    // Act
    const actual = sut("abc");

    // Assert
    expect(actual).toBe(expected);
  });
});
