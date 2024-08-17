import { screen, render } from "@testing-library/react";

import RepositoriesSummary from "./RepositoriesSummary";

test("displays information about the repository", (): void => {
  const repository: Repository = {
    language: "Javascript",
    stargazers_count: 5,
    forks: 30,
    open_issues: 1,
  };
  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    // const value = repository[key as keyof typeof repository] as string | number;
    const value = repository[key as keyof Repository] as string | number;
    const element = screen.getByText(new RegExp(String(value))) as HTMLDivElement;
    // console.log("element:", element);

    expect(element).toBeInTheDocument();
  }
});
