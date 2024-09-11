import React from "react";

import ContactForm from "../components/ContactForm";

function AboutPage(): JSX.Element {
  return (
    <React.Fragment>
      <header className="center">
        <h1>About Us</h1>
        <p>
          We are a small team of developers who are passionate about testing. We have created this demo to help you learn how
          to use Cypress.
        </p>
        <p>
          Also follow us on our <a href="https://youtube.com/c/academind">YouTube channel</a>.
        </p>
      </header>
      <ContactForm />
    </React.Fragment>
  );
}

export default AboutPage;
