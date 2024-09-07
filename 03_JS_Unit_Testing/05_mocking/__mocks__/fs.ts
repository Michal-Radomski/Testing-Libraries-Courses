import { vi } from "vitest";

export const promises = {
  writeFile: vi.fn((path, data) => {
    console.log("path, data:", path, data);
    return new Promise<void>((resolve, _reject) => {
      resolve();
    });
  }),
};
