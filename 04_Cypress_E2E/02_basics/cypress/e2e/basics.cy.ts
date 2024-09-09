/// <reference types="cypress" />

// describe("template spec", (): void => {
//   it("passes", () => {
//     cy.visit("https://example.cypress.io");
//   });
// });

describe("tasks page", (): void => {
  it("should render the main image", (): void => {
    cy.visit("http://localhost:5173/");
    cy.get(".main-header img");
  });

  it("should display the page title", (): void => {
    cy.visit("http://localhost:5173/");
    cy.get("h1").should("have.length", 1);
    cy.get("h1").should("exist");
    cy.get("h1").contains("My Cypress Course Tasks");
    cy.contains("My Cypress Course Tasks");
  });
});
