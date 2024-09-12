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
// describe("contact form", (): void => {
//   it("should submit the form", (): void => {
//     cy.visit("http://localhost:5173/about");
//     cy.get('[data-cy="contact-input-message"]').type("Hello world!");
//     cy.get('[data-cy="contact-input-name"]').type("John Doe");
//     cy.get('[data-cy="contact-input-email"]').type("test@example.com");
//     cy.get('[data-cy="contact-btn-submit"]').contains("Send Message").should("not.have.attr", "disabled");
//     cy.get('[data-cy="contact-btn-submit"]').as("submitBtn"); //* Alias - recommended
//     cy.get("@submitBtn").click();
//     cy.get("@submitBtn").contains("Sending...");
//     cy.get("@submitBtn").should("have.attr", "disabled");
//     // const btn:Cypress.Chainable<JQuery<HTMLElement>> = cy.get('[data-cy="contact-btn-submit"]'); //* Not recommended!
//     // cy.log("btn:", btn);
//   });
// });

//* V3
// describe("contact form", (): void => {
//   it("should submit the form", (): void => {
//     cy.visit("http://localhost:5173/about");
//     cy.get('[data-cy="contact-input-message"]').type("Hello world!");
//     cy.get('[data-cy="contact-input-name"]').type("John Doe");
//     cy.get('[data-cy="contact-input-email"]').type("test@example.com");
//     cy.get('[data-cy="contact-btn-submit"]').then((el: JQuery<HTMLElement>) => {
//       // cy.log("el:", el);
//       expect(el.attr("disabled")).to.be.undefined;
//       expect(el.text()).to.eq("Send Message");
//     });
//     // cy.get('[data-cy="contact-btn-submit"]')
//     //   .contains('Send Message')
//     //   .should('not.have.attr', 'disabled');
//     cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
//     cy.get("@submitBtn").click();
//     cy.get("@submitBtn").contains("Sending...");
//     cy.get("@submitBtn").should("have.attr", "disabled");
//   });
// });

//* V4
describe("contact form", (): void => {
  it("should submit the form", (): void => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello world!");
    cy.get('[data-cy="contact-input-name"]').type("John Doe");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.eq("Send Message");
    });
    cy.get('[data-cy="contact-input-email"]').type("test@example.com{enter}"); //* Key press simulation
    // cy.get('[data-cy="contact-btn-submit"]')
    //   .contains('Send Message')
    //   .should('not.have.attr', 'disabled');
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    // cy.get('@submitBtn').click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
  });

  //* New test
  it("should validate the form input", (): void => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-input-message"]').as("msgInput");
    cy.get("@msgInput").focus().blur();
    cy.get("@msgInput")
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });

    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .then((el) => {
        expect(el.attr("class")).to.contains("invalid");
      });
  });
});
