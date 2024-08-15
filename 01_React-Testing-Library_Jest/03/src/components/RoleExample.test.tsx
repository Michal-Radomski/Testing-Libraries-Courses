import React from "react";
import { render, screen } from "@testing-library/react";

import RoleExample from "./RoleExample";

test("can find elements by role", () => {
  render(<RoleExample />);

  const roles = [
    "link",
    "button",
    "contentinfo",
    "heading",
    "banner",
    "img",
    "checkbox",
    "spinbutton",
    "radio",
    "textbox",
    "listitem",
    "list",
  ];

  for (let role of roles) {
    const el = screen.getByRole(role) as HTMLElement;

    expect(el).toBeInTheDocument();
  }
});
