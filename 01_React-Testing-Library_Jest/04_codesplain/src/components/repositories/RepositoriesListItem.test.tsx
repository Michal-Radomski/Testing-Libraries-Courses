import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent(): { repository: Repository } {
  const repository: Repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A js library",
    owner: {
      login: "facebook",
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github homepage for this repository", async (): Promise<void> => {
  const { repository } = renderComponent();

  (await screen.findByRole("img", { name: "Javascript" })) as HTMLImageElement;

  const link = screen.getByRole("link", {
    name: /github repository/i,
  }) as HTMLLinkElement;

  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a fileicon with the appropriate icon", async (): Promise<void> => {
  renderComponent();

  const icon = (await screen.findByRole("img", { name: "Javascript" })) as HTMLImageElement;

  expect(icon).toHaveClass("js-icon");
});

test("shows a link to the code editor page", async (): Promise<void> => {
  const { repository } = renderComponent();

  (await screen.findByRole("img", { name: "Javascript" })) as HTMLImageElement;

  const link = (await screen.findByRole("link", {
    name: new RegExp(repository?.owner?.login!),
  })) as HTMLLinkElement;

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
