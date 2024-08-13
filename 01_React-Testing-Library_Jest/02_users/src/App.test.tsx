import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "./App";

test("can receive a new user and show it on a list", async (): Promise<void> => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  }) as HTMLInputElement;
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  }) as HTMLInputElement;
  const button = screen.getByRole("button") as HTMLButtonElement;

  await user.click(nameInput);
  await user.keyboard("jane");
  await user.click(emailInput);

  await user.keyboard("jane@jane.com");

  await user.click(button);
  // eslint-disable-next-line testing-library/no-debugging-utils
  // screen.debug();

  const name = screen.getByRole("cell", { name: "jane" }) as HTMLTableCellElement;
  const email = screen.getByRole("cell", { name: "jane@jane.com" }) as HTMLTableCellElement;
  // console.log("name.innerHTML:", name.innerHTML);
  // console.log("email.innerHTML:", email.innerHTML);

  expect(name.innerHTML).toEqual("jane");
  expect(email.innerHTML).toEqual("jane@jane.com");

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
