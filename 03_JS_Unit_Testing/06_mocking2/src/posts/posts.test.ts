import { beforeEach, describe, expect, it } from "vitest";

import { extractPostData } from "./posts";

describe("extractPostData()", (): void => {
  const testTitle: string = "Test title";
  const testContent: string = "Test content";
  let testFormData: CustomPost;

  beforeEach((): void => {
    testFormData = {
      title: testTitle,
      content: testContent,
      get(identifier: string) {
        return this[identifier as keyof typeof testFormData];
      },
    };
  });

  it("should extract title and content from the provided form data", (): void => {
    const data = extractPostData(testFormData as FormData);

    expect(data.title).toBe(testTitle);
    expect(data.content).toBe(testContent);
  });
});
