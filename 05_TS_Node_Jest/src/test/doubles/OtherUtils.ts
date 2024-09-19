import { calculateComplexity, StringInfo, toUpperCaseWithCb } from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", (): void => {
  it("ToUpperCase - calls callback for invalid argument", (): void => {
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", (): void => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });

  it("Calculates complexity", (): void => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      },
    } as unknown as StringInfo;

    const actual = calculateComplexity(someInfo);
    expect(actual).toBe(10);
  });
});
