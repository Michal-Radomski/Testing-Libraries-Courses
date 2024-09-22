import { getRequestBody } from "../../../app/server_app/utils/Utils";
import { IncomingMessage } from "http";

const requestMock = {
  on: jest.fn(),
};

const someObject = {
  name: "John",
  age: 30,
  city: "Paris",
};

const someObjectAsString: string = JSON.stringify(someObject);

describe("getRequestBody test suite", (): void => {
  it("should return object for valid JSON", async (): Promise<void> => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb(someObjectAsString);
      } else {
        cb();
      }
    });

    const actual = await getRequestBody(requestMock as unknown as IncomingMessage);
    expect(actual).toEqual(someObject);
  });

  it("should throw error for invalid JSON", async (): Promise<void> => {
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "data") {
        cb("a" + someObjectAsString);
      } else {
        cb();
      }
    });

    await expect(getRequestBody(requestMock as any)).rejects.toThrow("Unexpected token");
    await expect(getRequestBody(requestMock as any)).rejects.toThrow(new RegExp("Unexpected token"));
  });

  it("should throw error for unexpected error", async (): Promise<void> => {
    const someError = new Error("Something went wrong!") as Error;
    requestMock.on.mockImplementation((event, cb) => {
      if (event == "error") {
        cb(someError);
      }
    });

    await expect(getRequestBody(requestMock as any)).rejects.toThrow(someError.message);
  });
});
