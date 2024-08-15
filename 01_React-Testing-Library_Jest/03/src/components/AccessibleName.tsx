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
    <React.Fragment>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" />
        <label htmlFor="search">Search</label>
        <input id="search" />
      </div>
    </React.Fragment>
  );
}

export function IconButtons(): JSX.Element {
  return (
    <React.Fragment>
      <div>
        <button aria-label="sign in">
          <svg />
        </button>

        <button aria-label="sign out">
          <svg />
        </button>
      </div>
    </React.Fragment>
  );
}
