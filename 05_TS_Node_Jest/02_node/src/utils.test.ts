import { test } from "node:test";
import { strictEqual } from "node:assert";

import { toUpperCase } from "./utils";

test("to upper case", (): void => {
  const actual: string = toUpperCase("abc");
  const expected: string = "ABC";
  strictEqual(actual, expected);
});
