import React from "react";

function Filter({ onFilterChange }: { onFilterChange: (arg0: string) => void }): JSX.Element {
  function filterChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange(event.target.value);
  }

  return (
    <React.Fragment>
      <select id="filter" onChange={filterChangeHandler}>
        <option value="all">All</option>
        <option value="urgent">🚨 Urgent</option>
        <option value="important">🔴 Important</option>
        <option value="moderate">🔵 Moderate</option>
        <option value="low">🟢 Low</option>
      </select>
    </React.Fragment>
  );
}

export default Filter;
