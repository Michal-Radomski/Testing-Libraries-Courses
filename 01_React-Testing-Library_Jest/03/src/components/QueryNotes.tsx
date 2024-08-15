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

function fakeFetchColors(): Promise<string[]> {
  return Promise.resolve(["red", "green", "blue"]);
}

export function LoadableColorList(): JSX.Element {
  const [colors, setColors] = React.useState<string[]>([]);

  React.useEffect(() => {
    fakeFetchColors()
      .then((colors: string[]) => setColors(colors))
      .catch((err) => console.log("err:", err));
  }, []);

  const renderedColors: JSX.Element[] = colors.map((color: string) => {
    return <li key={color}>{color}</li>;
  });

  // return <ul>{renderedColors}</ul>;
  const List: JSX.Element = <ul>{renderedColors}</ul>;
  return List;
}

const QueryNotes = (): JSX.Element => {
  return (
    <React.Fragment>
      <ColorList />
      <LoadableColorList />
    </React.Fragment>
  );
};

export default QueryNotes;
