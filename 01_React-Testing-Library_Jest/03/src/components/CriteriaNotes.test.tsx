import React from "react";
import { render, screen } from "@testing-library/react";

import { DataForm } from "./CriteriaNotes";

test("selecting different elements", () => {
  render(<DataForm />);

  const elements = [
    screen.getByRole("button"),
    screen.getByText(/enter/i),

    screen.getByLabelText(/email/i),
    screen.getByPlaceholderText("Red"),
    screen.getByDisplayValue("test@test.com"),
    screen.getByAltText("data"),
    screen.getByTitle(/ready to submit/i),

    screen.getByTestId("image wrapper"),
  ];

  for (let element of elements) {
    expect(element).toBeInTheDocument();
  }
});
