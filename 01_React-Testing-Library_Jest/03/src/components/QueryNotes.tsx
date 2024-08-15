import React from "react";

export function ColorList(): JSX.Element {
  return (
    <ul>
      <li>Red</li>
      <li>Blue</li>
      <li>Green</li>
    </ul>
  );
}

const QueryNotes = (): JSX.Element => {
  return (
    <React.Fragment>
      <ColorList />
    </React.Fragment>
  );
};

export default QueryNotes;
