import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import Header from "./components/Header";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
