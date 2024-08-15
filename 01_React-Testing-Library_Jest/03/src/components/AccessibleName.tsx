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
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" version="1.1" width={24} height={"auto"}>
            <rect fill="none" height="256" width="256" />
            <polyline
              fill="none"
              points="94 170 136 128 94 86"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            />
            <line
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              x1="24"
              x2="136"
              y1="128"
              y2="128"
            />
            <path
              d="M136,40h56a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H136"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            />
          </svg>
        </button>

        <button aria-label="sign out">
          <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" version="1.1" width={24} height={"auto"}>
            <rect fill="none" height="256" width="256" />
            <polyline
              fill="none"
              points="174 86 216 128 174 170"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            />
            <line
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
              x1="104"
              x2="216"
              y1="128"
              y2="128"
            />
            <path
              d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            />
          </svg>
        </button>
      </div>
    </React.Fragment>
  );
}
