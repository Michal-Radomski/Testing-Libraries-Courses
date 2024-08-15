import React from "react";
import { render, screen, within } from "@testing-library/react";

import MatchersNotes from "./MatchersNotes";

interface Result {
  pass: boolean;
  message: () => string;
}

function toContainRole(container: HTMLElement, role: string, quantity = 1): Result {
  const elements = within(container).queryAllByRole(role) as HTMLElement[];

  if (elements.length === quantity) {
    return {
      pass: true,
      message: () => "OK",
    };
  }

  return {
    pass: false,
    message: () => `Expected to find ${quantity} ${role} elements. Found ${elements.length} instead.`,
  };
}

expect.extend({ toContainRole });

test("the form displays two buttons", (): void => {
  render(<MatchersNotes />);

  const form = screen.getByRole("form") as HTMLFormElement;

  expect(form).toContainRole("link", 0); //* No links in the component!
});
