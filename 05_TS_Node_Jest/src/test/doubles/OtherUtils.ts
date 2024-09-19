import { calculateComplexity, StringInfo } from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", (): void => {
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
