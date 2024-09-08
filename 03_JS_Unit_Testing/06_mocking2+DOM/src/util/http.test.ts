import { it, vi, expect, describe } from "vitest";

import { HttpError } from "./errors";
import { sendDataRequest } from "./http";

describe("http.ts", (): void => {
  const testResponseData = { testKey: "testData" };

  const testFetch = vi.fn((_url, options): Promise<unknown> => {
    return new Promise((resolve, reject) => {
      if (typeof options.body !== "string") {
        return reject("Not a string.");
      }
      const testResponse = {
        ok: true,
        json() {
          return new Promise((resolve, _reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });

  vi.stubGlobal("fetch", testFetch);

  it("should return any available response data", (): Promise<void> => {
    const testData = { key: "test" };

    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
  });

  it("should convert the provided data to JSON before sending the request", async (): Promise<void> => {
    const testData = { key: "test" };

    let errorMessage;

    try {
      await sendDataRequest(testData);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).not.toBe("Not a string.");
  });

  it("should throw an HttpError in case of non-ok responses", (): Promise<void> => {
    testFetch.mockImplementationOnce((_url, _options) => {
      return new Promise((resolve, _reject) => {
        const testResponse = {
          ok: false,
          json() {
            return new Promise((resolve, _reject) => {
              resolve(testResponseData);
            });
          },
        };
        resolve(testResponse);
      });
    });

    const testData = { key: "test" };

    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
  });
});
