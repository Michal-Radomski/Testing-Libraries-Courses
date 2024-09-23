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

    await waitFor((): void => {
      const resultLabel = screen.getByTestId("resultLabel") as HTMLLabelElement;
      expect(resultLabel.textContent).toBe("UserName and password required!");
    });
  });

  it("right credentials - successful login", async (): Promise<void> => {
    loginServiceMock.login.mockResolvedValueOnce("1234");

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input") as NodeListOf<HTMLInputElement>; //* Error
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    expect(loginServiceMock.login).toBeCalledWith("someUser", "somePassword");

    const resultLabel = (await screen.findByTestId("resultLabel")) as HTMLLabelElement;
    expect(resultLabel.textContent).toBe("successful login");
  });

  it("right credentials - successful login - with user calls", async (): Promise<void> => {
    loginServiceMock.login.mockResolvedValueOnce("1234");

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input") as NodeListOf<HTMLInputElement>; //* Error;
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    user.click(userNameInput);
    user.keyboard("someUser");
    user.click(passwordInput);
    user.keyboard("somePassword");
    user.click(loginButton);

    // await waitFor(async () => {
    //   await expect(loginServiceMock.login).toBeCalledWith("someUser", "somePassword");
    // });

    await waitFor(async (): Promise<void> => {
      const resultLabel = (await screen.findByTestId("resultLabel")) as HTMLLabelElement;
      expect(resultLabel.textContent).toBe("successful login");
    });
  });

  it("right credentials - unsuccessful login", async (): Promise<void> => {
    loginServiceMock.login.mockResolvedValueOnce(undefined);

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input") as NodeListOf<HTMLInputElement>; //* Error;;
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    expect(loginServiceMock.login).toBeCalledWith("someUser", "somePassword");

    const resultLabel = (await screen.findByTestId("resultLabel")) as HTMLLabelElement;
    expect(resultLabel.textContent).toBe("invalid credentials");
  });

  it("right credentials - unsuccessful login - solve act warnings", async (): Promise<void> => {
    const result = Promise.resolve(undefined);
    loginServiceMock.login.mockReturnValueOnce(result);

    // eslint-disable-next-line testing-library/no-node-access
    const inputs = container.querySelectorAll("input") as NodeListOf<HTMLInputElement>; //* Error;;
    const userNameInput = inputs[0];
    const passwordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(userNameInput, { target: { value: "someUser" } });
    fireEvent.change(passwordInput, { target: { value: "somePassword" } });
    fireEvent.click(loginButton);

    await result;
    expect(loginServiceMock.login).toBeCalledWith("someUser", "somePassword");

    const resultLabel = (await screen.findByTestId("resultLabel")) as HTMLLabelElement;
    expect(resultLabel.textContent).toBe("invalid credentials");
  });
});
