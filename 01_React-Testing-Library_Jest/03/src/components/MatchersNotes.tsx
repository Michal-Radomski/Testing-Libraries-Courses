import React from "react";

const MatchersNotes = (): JSX.Element => {
  return (
    <React.Fragment>
      <div>
        <button>Go Back</button>
        <form aria-label="form">
          <button>Save</button>
          <button>Cancel</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MatchersNotes;
