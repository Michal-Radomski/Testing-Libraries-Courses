import { describe, it, expect, vi, SpyInstanceFn } from "vitest";

import { generateReportData } from "./data";

//* Spy
describe("generateReportData()", () => {
  it("should execute logFn if provided", (): void => {
    const logger: SpyInstanceFn<any[], any> = vi.fn();

    // logger.mockImplementationOnce(() => {});

    generateReportData(logger);

    expect(logger).toBeCalled();
    expect(logger).toHaveBeenCalled();
  });
});
