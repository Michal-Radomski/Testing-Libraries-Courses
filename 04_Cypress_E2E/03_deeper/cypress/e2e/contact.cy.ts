/// <reference types="cypress" />

//* V1
// describe("contact form", (): void => {
//   it("should submit the form", (): void => {
//     cy.visit("http://localhost:5173/about");
//     cy.get('[data-cy="contact-input-message"]').type("Hello world!");
//     cy.get('[data-cy="contact-input-name"]').type("John Doe");
//     cy.get('[data-cy="contact-input-email"]').type("test@example.com");
//     cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
//     cy.get('[data-cy="contact-btn-submit"]').should("not.have.attr", "disabled");
//     cy.get('[data-cy="contact-btn-submit"]').click();
//     cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
//     cy.get('[data-cy="contact-btn-submit"]').should("have.attr", "disabled");
//   });
// });

//* V2
describe("contact form", (): void => {
  it("should submit the form", (): void => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello world!");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-input-email"]').type("test@example.com");
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message").should("not.have.attr", "disabled");
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn"); //* alias
    cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
    // const btn = cy.get('[data-cy="contact-btn-submit"]');
    // console.log("btn:", btn);
  });
});
