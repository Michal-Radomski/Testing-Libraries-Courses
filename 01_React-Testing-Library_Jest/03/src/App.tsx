import React from "react";

import "./App.scss";
import RoleExample from "./components/RoleExample";
import AccessibleName, { IconButtons, MoreNames } from "./components/AccessibleName";
import QueryNotes from "./components/QueryNotes";
import CriteriaNotes from "./components/CriteriaNotes";

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
      <IconButtons />
      <br />
      <hr />

      <QueryNotes />
      <br />
      <hr />

      <CriteriaNotes />
      <br />
      <hr />
    </React.Fragment>
  );
};

export default App;
