import React from "react";

import "./App.scss";

type ChildProps = {
  parentCounter: number;
};

function ChildCounter(props: ChildProps): JSX.Element {
  const [childCounter, setChildCounter] = React.useState<number>(0);

  function handleClickIncrement(): void {
    setChildCounter(childCounter + 1);
  }
  console.log("Rendering child component");

  return (
    <div style={{ border: "1px dashed red" }}>
      <button onClick={handleClickIncrement}>Increment child counter</button>
      <p>ChildCounter: {childCounter}</p>
      <p>ParentCounter: {props.parentCounter}</p>
    </div>
  );
}

function ParentCounter(): JSX.Element {
  const [parentCounter, setParentCounter] = React.useState<number>(0);

  function handleClickIncrement(): void {
    setParentCounter(parentCounter + 1);
  }
  console.log("Rendering parent component");

  return (
    <div style={{ border: "1px dashed blue" }}>
      <button onClick={handleClickIncrement}>Increment parent counter</button>
      <ChildCounter parentCounter={parentCounter} />
    </div>
  );
}

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      App
      <br />
      <ParentCounter />
    </React.Fragment>
  );
};

export default App;
