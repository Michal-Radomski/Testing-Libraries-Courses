import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DefaultBodyType, MockedResponse, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";

import HomeRoute from "./HomeRoute";
import { createServer, MaybePromise } from "../test/server";

createServer([
  {
    path: "/api/repositories",
    res: (req: RestRequest<never, PathParams<string>>, _res: ResponseComposition<DefaultBodyType>, _ctx: RestContext) => {
      const language = req.url.searchParams.get("q")?.split("language:")[1] as string;
      // console.log("language:", language);

      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ],
      } as unknown as MaybePromise<MockedResponse<DefaultBodyType>>;
    },
  },
]);

test("renders two links for each language - V1 - test", async (): Promise<void> => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Loop over each language
  const languages: string[] = ["javascript", "typescript", "rust", "go", "python", "java"];
  for (let language of languages) {
    // For each language, make sure we see two links
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});

it("renders two links for each language - V2 - it", async (): Promise<void> => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Loop over each language
  const languages = ["javascript", "typescript", "rust", "go", "python", "java"];
  for (let language of languages) {
    // For each language, make sure we see two links
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}_`),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}_two`);
  }
});

// const pause = () =>
//   new Promise((resolve) => {
//     setTimeout(resolve, 100);
//   });
