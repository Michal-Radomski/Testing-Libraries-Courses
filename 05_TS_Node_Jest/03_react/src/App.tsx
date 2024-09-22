import React from "react";

import "./App.scss";
import LoginComponent from "./LoginComponent";
import LoginService from "./services/LoginService";

// type ChildProps = {
//   parentCounter: number;
// };

// const ChildCounter = (props: ChildProps): JSX.Element => {
//   const [childCounter, setChildCounter] = React.useState<number>(0);

//   const handleClickIncrement = (): void => {
//     setChildCounter(childCounter + 1);
//   };
//   console.log("Rendering child component");

//   return (
//     <div style={{ border: "1px dashed red" }}>
//       <button onClick={handleClickIncrement}>Increment child counter</button>
//       <p>ChildCounter: {childCounter}</p>
//       <p>ParentCounter: {props.parentCounter}</p>
//     </div>
//   );
// };

// const ParentCounter = (): JSX.Element => {
//   const [parentCounter, setParentCounter] = React.useState<number>(0);

//   const handleClickIncrement = (): void => {
//     setParentCounter(parentCounter + 1);
//   };
//   console.log("Rendering parent component");

//   return (
//     <div style={{ border: "1px dashed blue" }}>
//       <button onClick={handleClickIncrement}>Increment parent counter</button>
//       <ChildCounter parentCounter={parentCounter} />
//     </div>
//   );
// };

const loginService: LoginService = new LoginService();

const setToken = (token: string): void => {
  console.log(`received the token ${token}`);
};

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      App
      {/* <br />
      <ParentCounter /> */}
      <br />
      <LoginComponent loginService={loginService} setToken={setToken} />
    </React.Fragment>
  );
};

export default App;
