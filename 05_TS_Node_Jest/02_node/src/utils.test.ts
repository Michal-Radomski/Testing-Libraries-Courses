import { describe, mock, test } from "node:test";
// import { strictEqual } from "node:assert";
import assert from "assert";

import { toUpperCaseString } from "./utils";

describe("Node test runner", (): void => {
  test("to upper case", (): void => {
    const actual: string = toUpperCaseString("abc");
    const expected: string = "ABC";
    // strictEqual(actual, expected);
    assert.strictEqual(actual, expected);
  });

  test("sum mock", (): void => {
    // console.log("mock:", mock);
    const toUpperCaseStringMock = mock.fn((arg: string): string => {
      return toUpperCaseString(arg);
    });
    // console.log("toUpperCaseStringMock:", toUpperCaseStringMock);
    assert.strictEqual(toUpperCaseStringMock.mock.callCount(), 0);
    assert.strictEqual(toUpperCaseString("abc"), "ABC");
    assert.strictEqual(toUpperCaseStringMock.mock.callCount(), 1);
  });
});
