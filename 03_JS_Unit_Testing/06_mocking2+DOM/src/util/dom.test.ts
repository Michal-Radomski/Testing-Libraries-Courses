import fs from "fs";
import path from "path";

import { beforeEach, describe, expect, it, vi } from "vitest";
import { Window, Document } from "happy-dom";

import { showError } from "./dom";

describe("dom.ts", (): void => {
  const htmlDocPath: string = path.join(process.cwd() as string, "index.html");
  const htmlDocumentContent: string = fs.readFileSync(htmlDocPath).toString();

  const window: Window = new Window();
  const document: Document = window.document;
  // console.log("window:", window);
  // console.log("document:", document);

  vi.stubGlobal("document", document);

  beforeEach((): void => {
    document.body.innerHTML = "";
    document.write(htmlDocumentContent);
  });

  it('should add an error paragraph to the id="errors" element', (): void => {
    showError("Test");

    const errorsEl = document.getElementById("errors");
    const errorParagraph = errorsEl!.firstElementChild;

    expect(errorParagraph).not.toBeNull();
  });

  it("should not contain an error paragraph initially", (): void => {
    const errorsEl = document.getElementById("errors");
    const errorParagraph = errorsEl!.firstElementChild;

    expect(errorParagraph).toBeNull();
  });

  it("should output the provided message in the error paragraph", (): void => {
    const testErrorMessage = "Test";

    showError(testErrorMessage);

    const errorsEl = document.getElementById("errors");
    const errorParagraph = errorsEl!.firstElementChild;

    expect(errorParagraph.textContent).toBe(testErrorMessage);
  });
});
