import { calculateComplexity, StringInfo, toUpperCaseWithCb } from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite", (): void => {
  //* Mocks
  describe.only("Tracking callbacks with Jest mocks", (): void => {
    const callBackMock: jest.Mock<any, any, any> = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", (): void => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      // expect(callBackMock).toBeCalledWith("Invalid argument!");
      expect(callBackMock).toHaveBeenCalledWith("Invalid argument!");
      // expect(callBackMock).toBeCalledTimes(1);
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it("calls callback for valid argument - track calls", (): void => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackMock).toBeCalledWith("called function with abc");
      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  //* Mocks
  describe("Tracking callbacks", (): void => {
    let cbArgs = [] as string[];
    let timesCalled = 0;

    function callBackMock(arg: string): void {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach((): void => {
      // clearing tracking fields:
      cbArgs = [];
      timesCalled = 0;
    });

    it("calls callback for invalid argument - track calls", (): void => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid argument!");
      expect(timesCalled).toBe(1);
    });

    it("calls callback for valid argument - track calls", (): void => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });

  it("ToUpperCase - calls callback for invalid argument", (): void => {
    //* Fake
    const actual = toUpperCaseWithCb("", () => {});
    expect(actual).toBeUndefined();
  });

  it("ToUpperCase - calls callback for valid argument", (): void => {
    const actual = toUpperCaseWithCb("abc", () => {});
    expect(actual).toBe("ABC");
  });

  it("Calculates complexity", (): void => {
    //* Stub
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
