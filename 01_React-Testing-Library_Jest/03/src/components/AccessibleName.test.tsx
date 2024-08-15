import React from "react";
import { render, screen } from "@testing-library/react";

import AccessibleName, { MoreNames } from "./AccessibleName";

test("can select by accessible name", (): void => {
  render(<AccessibleName />);

  const submitButton = screen.getByRole("button", {
    name: /submit/i,
  });
  const cancelButton = screen.getByRole("button", {
    name: /cancel/i,
  });

  expect(submitButton).toBeInTheDocument();
  expect(cancelButton).toBeInTheDocument();
});

test("shows an email and search input", (): void => {
  render(<MoreNames />);

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });
  const searchInput = screen.getByRole("textbox", {
    name: /search/i,
  });

  expect(emailInput).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});
