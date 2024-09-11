import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.scss";

function Header(): JSX.Element {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Cypress Demo</h1>
        <nav>
          <ul>
            <li>
              <Link to="/" data-cy="header-home-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" data-cy="header-about-link">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
}

export default Header;
