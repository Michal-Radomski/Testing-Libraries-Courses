import React from "react";
import { render, screen } from "@testing-library/react";

import { ColorList, LoadableColorList } from "./QueryNotes";

test("getBy, queryBy, findBy finding 0 elements", async (): Promise<void> => {
  render(<ColorList />);

  expect(() => screen.getByRole("textbox")).toThrow();

  expect(screen.queryByRole("textbox")).toEqual(null);

  let errorThrown: boolean = false;
  try {
    await screen.findByRole("textbox");
  } catch (err) {
    errorThrown = true;
  }
  expect(errorThrown).toEqual(true);
});

test("getBy, queryBy, findBy when they find 1 element", async (): Promise<void> => {
  render(<ColorList />);

  expect(screen.getByRole("list")).toBeInTheDocument();

  expect(
    // eslint-disable-next-line testing-library/prefer-presence-queries
    screen.queryByRole("list")
  ).toBeInTheDocument();

  expect(await screen.findByRole("list")).toBeInTheDocument();
});

test("getAllBy, queryAllBy, findAllBy", async (): Promise<void> => {
  render(<ColorList />);

  expect(screen.getAllByRole("listitem")).toHaveLength(3);

  expect(screen.queryAllByRole("listitem")).toHaveLength(3);

  expect(await screen.findAllByRole("listitem")).toHaveLength(3);
});

test("favor using getBy to prove an element exists", (): void => {
  render(<ColorList />);

  const element = screen.getByRole("list") as HTMLUListElement;

  expect(element).toBeInTheDocument();
});

test("favor queryBy when proving an element does not exist", (): void => {
  render(<ColorList />);

  const element = screen.queryByRole("textbox") as HTMLInputElement | null;

  expect(element).not.toBeInTheDocument();
});

//* Fetching/ promise
test("favor findBy or findAllBy when data fetching", async (): Promise<void> => {
  render(<LoadableColorList />);

  const elems = (await screen.findAllByRole("listitem")) as HTMLLIElement[];

  expect(elems).toHaveLength(3);
});
