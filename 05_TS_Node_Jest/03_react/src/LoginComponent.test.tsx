import { render, screen } from "@testing-library/react";

import LoginComponent from "./LoginComponent";

describe("Login component tests", (): void => {
  const loginServiceMock = {
    login: jest.fn() as jest.Mock<any, any>,
  };
  const setTokenMock = jest.fn() as jest.Mock<any, any>;

  it("should render correctly the login component", (): void => {
    const container = render(<LoginComponent loginService={loginServiceMock} setToken={setTokenMock} />)
      .container as HTMLDivElement;
    // console.log("container.innerHTML:", container.innerHTML);
    expect(container).toBeInTheDocument();

    const mainElement = screen.getByRole("main") as HTMLDivElement;
    expect(mainElement).toBeInTheDocument();
  });
});
