import { getStringInfo, toUpperCase } from "../app/Utils";

describe("Utils test suite", (): void => {
  it("should return uppercase of valid string", (): void => {
    // Arrange
    const sut = toUpperCase;
    const expected = "ABC";
    // Act
    const actual = sut("abc");
    // Assert
    expect(actual).toBe(expected);
  });

  //* V1
  // it.only("should return info for valid string", (): void => {
  //   const actual = getStringInfo("My-String");

  //   expect(actual.lowerCase).toBe("my-string"); //* Primitives
  //   expect(actual.extraInfo).toEqual({}); //* Objects

  //   expect(actual.characters.length).toBe(9);
  //   expect(actual.characters).toHaveLength(9); //* Better assertion

  //   expect(actual.characters).toEqual(["M", "y", "-", "S", "t", "r", "i", "n", "g"]);
  //   expect(actual.characters).toContain<string>("M");
  //   expect(actual.characters).toEqual(expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"]));

  //   expect(actual.extraInfo).not.toBe(undefined);
  //   expect(actual.extraInfo).not.toBeUndefined(); //* Better assertion
  //   expect(actual.extraInfo).toBeDefined();
  //   expect(actual.extraInfo).toBeTruthy();
  // });

  //* V2
  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toHaveLength(9);
    });

    test("return right lower case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });

    test("return right upper case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.upperCase).toBe("MY-STRING");
    });

    test("return right characters", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toEqual(["M", "y", "-", "S", "t", "r", "i", "n", "g"]);
      expect(actual.characters).toContain<string>("M");
      expect(actual.characters).toEqual(expect.arrayContaining(["S", "t", "r", "i", "n", "g", "M", "y", "-"]));
    });

    test("return defined extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toEqual({});
    });
  });
});
