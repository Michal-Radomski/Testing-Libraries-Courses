import React from "react";

import CourseGoals from "./components/CourseGoals";
import Header from "./components/Header";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <main>
        <CourseGoals />
      </main>
    </React.Fragment>
  );
}

export default App;
