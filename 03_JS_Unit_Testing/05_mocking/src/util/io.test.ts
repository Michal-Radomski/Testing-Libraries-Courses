import { it, expect, vi } from "vitest";
import { promises as fs } from "fs";

import writeData from "./io";

// Define the type for the join function
type JoinFunction = (...args: string[]) => string;

vi.mock("fs");
vi.mock("path", () => {
  return {
    default: {
      join: ((...args: string[]): string => {
        return args[args.length - 1];
      }) as JoinFunction,
    },
  };
});

it("should execute the writeFile method", (): void => {
  const testData = "Test";
  const testFilename = "test.txt";

  writeData(testData, testFilename);

  // return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
  // expect(fs.writeFile).toBeCalled();
  expect(fs.writeFile).toBeCalledWith(testFilename, testData);
});

// it("should return a promise that resolves to no value if called correctly", (): Promise<void> => {
//   const testData = "Test";
//   const testFilename = "test.txt";

//   writeData(testData, testFilename);

//   return expect(writeData(testData, testFilename)).resolves.toBeUndefined();
//   // expect(fs.writeFile).toBeCalled();
//   // expect(fs.writeFile).toBeCalledWith(testFilename, testData);
// });
