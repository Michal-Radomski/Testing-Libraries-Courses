import React from "react";

import LoginService from "./services/LoginService";

type LoginProps = {
  loginService: LoginService;
  setToken: (token: string) => void;
};

const LoginComponent = ({ loginService, setToken }: LoginProps): JSX.Element => {
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loginResult, setLoginResult] = React.useState<string>("");

  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    console.log(userName + " " + password);
    if (userName && password) {
      const loginResponse = (await loginService.login(userName, password)) as string;
      console.log({ loginResponse });

      if (loginResponse) {
        setLoginResult("successful login");
        setToken(loginResponse);
      } else {
        setLoginResult("invalid credentials");
      }
    } else {
      setLoginResult("UserName and password required!");
    }
  };

  function renderLoginResult(): JSX.Element | undefined {
    if (loginResult) {
      return <label data-testid="resultLabel">{loginResult}</label>;
    }
  }

  return (
    <div role="main">
      <h2>Please login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>User name</label>
        <input data-testid="input" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <br />
        <label>Password</label>
        <input data-testid="input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <br />
        <input data-testid="input" type="submit" value="Login" />
      </form>
      <br />
      {renderLoginResult()}
    </div>
  );
};

export default LoginComponent;
