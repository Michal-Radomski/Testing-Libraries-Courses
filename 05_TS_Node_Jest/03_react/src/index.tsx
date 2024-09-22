import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.Fragment>
    <App />
  </React.Fragment>
);

// const list = new Array<string>();
// list.push("5");
// // list.push(5) //* Error
// console.log("list:", list);

// type List<T> = {
//   elements: T;
// };

// const abc: List<string> = { elements: "string" };
// console.log("abc:", abc);
