/// <reference types="cypress" />

describe("share location", (): void => {
  it("should fetch the user location", (): void => {
    cy.visit("/");
    cy.get('[data-cy="get-loc-btn"]').click();
  });
});
