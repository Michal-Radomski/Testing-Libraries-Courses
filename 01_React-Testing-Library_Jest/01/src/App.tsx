import React from "react";

import "./App.scss";
import ProductList from "./components/ProductList";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <div className="container mx-auto">
        <ProductList />
      </div>
    </React.Fragment>
  );
}

export default App;
