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
    fakeFetchColors().then((c: string[]) => setColors(c));
  }, []);

  const renderedColors = colors.map((color: string) => {
    return <li key={color}>{color}</li>;
  });

  return <ul>{renderedColors}</ul>;
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
