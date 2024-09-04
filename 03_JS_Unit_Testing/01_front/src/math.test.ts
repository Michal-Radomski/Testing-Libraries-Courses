import { it, expect, test } from "vitest";

import { add } from "./math";

//* it = test in Jest and Vitest
it("should summarize all number values in an array", (): void => {
  const result = add([1, 2, 3, 4, 5]) as number;
  expect(result).toBe(15);
});

test("should summarize all number values in an array", (): void => {
  const result = add([1, 2, 3, 4, 5]) as number;
  expect(result).toBe(15);
});
