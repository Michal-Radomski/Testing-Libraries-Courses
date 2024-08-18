import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { DefaultBodyType, MockedResponse } from "msw";

import { createServer, MaybePromise } from "../../test/server";
import AuthButtons from "./AuthButtons";

async function renderComponent(): Promise<void> {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
}

describe("when user is signed in", (): void => {
  // createServer() ---> GET '/api/user' ---> { user: { id: 3, email: 'asdf@a.com' }}
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 3, email: "asdf@asdf.com" } } as unknown as MaybePromise<MockedResponse<DefaultBodyType>>;
      },
    },
  ]);

  test("sign in and sign up are not visible", async (): Promise<void> => {
    await renderComponent();

    const signInButton = screen.queryByRole("link", {
      name: /sign in/i,
    }) as HTMLLinkElement;

    const signUpButton = screen.queryByRole("link", {
      name: /sign up/i,
    }) as HTMLLinkElement;

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("sign out is visible", async (): Promise<void> => {
    await renderComponent();

    const signOutButton = screen.getByRole("link", {
      name: /sign out/i,
    }) as HTMLLinkElement;

    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});

describe("when user is not signed in", (): void => {
  // createServer() ---> GET '/api/user' ---> { user: null }
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null } as unknown as MaybePromise<MockedResponse<DefaultBodyType>>;
      },
    },
  ]);

  test("sign in and sign up are visible", async (): Promise<void> => {
    await renderComponent();

    const signInButton = screen.getByRole("link", {
      name: /sign in/i,
    }) as HTMLLinkElement;

    const signUpButton = screen.getByRole("link", {
      name: /sign up/i,
    }) as HTMLLinkElement;

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async (): Promise<void> => {
    await renderComponent();

    const signOutButton = screen.queryByRole("link", {
      name: /sign out/i,
    }) as HTMLLinkElement;

    expect(signOutButton).not.toBeInTheDocument();
  });
});
