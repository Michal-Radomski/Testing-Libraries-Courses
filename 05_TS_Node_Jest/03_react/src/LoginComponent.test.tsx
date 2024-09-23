import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

import LoginComponent from "./LoginComponent";

describe("Login component tests", (): void => {
  const loginServiceMock = {
    login: jest.fn() as jest.Mock<any, any>,
  };
  const setTokenMock = jest.fn() as jest.Mock<any, any>;

  // it("should render correctly the login component", (): void => {
  //   const container = render(<LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />)
  //     .container as HTMLDivElement;
  //   // console.log("container.innerHTML:", container.innerHTML);
  //   expect(container).toBeInTheDocument();

  //   const mainElement = screen.getByRole("main") as HTMLDivElement;
  //   expect(mainElement).toBeInTheDocument();
  // });

  let container: HTMLDivElement;

  function setup(): void {
    container = render(<LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />)
      .container as HTMLDivElement;
    // console.log("container.innerHTML:", container.innerHTML);
  }

  beforeEach((): void => {
    setup();
  });

  it("should render correctly the login component", (): void => {
    const mainElement = screen.getByRole("main") as HTMLDivElement; //* Aria-role
    expect(mainElement).toBeInTheDocument();
    expect(screen.queryByTestId("resultLabel")).not.toBeInTheDocument();
  });

  it("should render correctly - query by test id", (): void => {
    const inputs = screen.getAllByTestId("input") as HTMLInputElement[]; //* data-testid="input"
    expect(inputs).toHaveLength(3);
    expect(inputs[0].getAttribute("value")).toBe("");
    expect(inputs[1].getAttribute("value")).toBe("");
    expect(inputs[2].getAttribute("value")).toBe("Login");
  });

  it("should render correctly - query by document query", (): void => {
    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input") as NodeListOf<HTMLInputElement>; //* Error
    expect(inputs).toHaveLength(3);
    expect(inputs[0].value).toBe("");
    expect(inputs[1].value).toBe("");
    expect(inputs[2].value).toBe("Login");
  });

  it("Click login button with incomplete credentials - show required message", (): void => {
    const inputs = screen.getAllByTestId("input") as HTMLInputElement[];
    const loginButton = inputs[2];

    fireEvent.click(loginButton);
    const resultLabel = screen.getByTestId("resultLabel") as HTMLLabelElement;
    expect(resultLabel.textContent).toBe("UserName and password required!");
  });

  it("Click login button with incomplete credentials - show required message - with user click", async (): Promise<void> => {
    const inputs = screen.getAllByTestId("input") as HTMLInputElement[];
    const loginButton = inputs[2];

    user.click(loginButton);

    await waitFor(async (): Promise<void> => {
      const resultLabel = screen.getByTestId("resultLabel");
      expect(resultLabel.textContent).toBe("UserName and password required!");
    });
  });
});
