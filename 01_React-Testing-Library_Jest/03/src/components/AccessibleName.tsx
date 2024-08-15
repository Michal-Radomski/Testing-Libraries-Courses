import React from "react";

const AccessibleName = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <button>Submit</button>
        <button>Cancel</button>
      </div>
    </React.Fragment>
  );
};

export default AccessibleName;

export function MoreNames(): JSX.Element {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" />

      <label htmlFor="search">Search</label>
      <input id="search" />
    </div>
  );
}
