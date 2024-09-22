import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders learn react link", (): void => {
  render(<App />);
  const appText = screen.getByText(/App/i);
  expect(appText).toBeInTheDocument();
});
