/// <reference types="cypress" />

describe("page navigation", (): void => {
  it("should navigate between pages", (): void => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-cy="header-about-link"]').click();
    cy.location("pathname").should("eq", "/about"); // /about => About page
    cy.go("back");
    cy.location("pathname").should("eq", "/"); // / => Home page
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location("pathname").should("eq", "/"); // / => Home page
  });
});
