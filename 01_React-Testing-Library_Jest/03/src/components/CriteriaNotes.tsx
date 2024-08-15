import React from "react";

export function DataForm(): JSX.Element {
  const [email, setEmail] = React.useState("test@test.com");

  return (
    <form>
      <h3>Enter Data</h3>

      <div data-testid="image wrapper">
        <img alt="data" src="data.jpg" />
      </div>

      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="color">Color</label>
      <input id="color" placeholder="Red" />

      <button title="Click when ready to submit">Submit</button>
    </form>
  );
}

const CriteriaNotes = (): JSX.Element => {
  return (
    <React.Fragment>
      <DataForm />
    </React.Fragment>
  );
};

export default CriteriaNotes;
