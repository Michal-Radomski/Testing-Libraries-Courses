import { render, screen, within } from "@testing-library/react";

import UserList from "./UserList";

const renderComponent = (): { users: User[]; container: HTMLElement } => {
  const users: User[] = [
    { name: "jane", email: "jane@jane.com" },
    { name: "sam", email: "sam@sam.com" },
  ];
  const { container } = render(<UserList users={users} />);
  // console.log("container:", container);

  return { users, container };
};

//* V1 - Preferable!
test("render one row per user", (): void => {
  // Render the component
  renderComponent();

  //* eslint-disable-next-line testing-library/no-debugging-utils
  // screen.logTestingPlaygroundURL();

  // Find all the rows in the table
  const rows = within(screen.getByTestId("users")).getAllByRole("row") as HTMLTableRowElement[];

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

//* V2
test("render one row per user2", (): void => {
  // eslint-disable-next-line testing-library/no-node-access
  const rows = renderComponent().container.querySelectorAll("tbody tr") as NodeListOf<HTMLTableRowElement>;

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", (): void => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name }) as HTMLTableCellElement;
    const email = screen.getByRole("cell", { name: user.email }) as HTMLTableCellElement;

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
