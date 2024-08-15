import React from "react";

import "./App.scss";
import RoleExample from "./components/RoleExample";
import AccessibleName, { MoreNames } from "./components/AccessibleName";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <RoleExample />
      <br />
      <hr />
      <AccessibleName />
      <br />
      <hr />
      <MoreNames />
      <br />
      <hr />
    </React.Fragment>
  );
};

export default App;
