// describe("template spec", (): void => {
//   it("passes", () => {
//     cy.visit("https://example.cypress.io");
//   });
// });

describe("template spec", (): void => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.get("li").should("have.length", 6);
  });
});
