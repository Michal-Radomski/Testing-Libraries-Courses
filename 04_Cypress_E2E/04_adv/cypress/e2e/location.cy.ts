/// <reference types="cypress" />

interface FakePosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}

describe("share location", (): void => {
  beforeEach((): void => {
    cy.clock();
    cy.fixture("user-location.json").as("userLocation");
    cy.visit("/").then((win: Cypress.AUTWindow) => {
      cy.get("@userLocation").then((fakePosition) => {
        cy.stub(win.navigator.geolocation, "getCurrentPosition")
          .as("getUserPosition")
          .callsFake((cb: Function) => {
            setTimeout(() => {
              cb(fakePosition);
            }, 100);
          });
      });
      cy.stub(win.navigator.clipboard, "writeText").as("saveToClipboard").resolves();
      cy.spy(win.localStorage, "setItem").as("storeLocation");
      cy.spy(win.localStorage, "getItem").as("getStoredLocation");
    });
  });

  it("should fetch the user location", (): void => {
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get("@getUserPosition").should("have.been.called");
    cy.get('[data-cy="get-loc-btn"]').should("be.disabled");
    cy.get('[data-cy="actions"]').should("contain", "Location fetched"); // contains()
  });

  it("should share a location URL", (): void => {
    cy.get('[data-cy="name-input"]').type("John Doe");
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@saveToClipboard").should("have.been.called");
    cy.get("@userLocation").then((fakePosition) => {
      const { latitude, longitude } = (fakePosition as unknown as FakePosition).coords;
      cy.get("@saveToClipboard").should(
        "have.been.calledWithMatch",
        new RegExp(`${latitude}.*${longitude}.*${encodeURI("John Doe")}`)
      );
      cy.get("@storeLocation").should(
        "have.been.calledWithMatch",
        /John Doe/,
        new RegExp(`${latitude}.*${longitude}.*${encodeURI("John Doe")}`)
      );
    });
    cy.get("@storeLocation").should("have.been.called");
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get("@getStoredLocation").should("have.been.called");
    cy.get('[data-cy="info-message"]').should("be.visible");
    cy.get('[data-cy="info-message"]').should("have.class", "visible");
    cy.tick(2000);
    cy.get('[data-cy="info-message"]').should("not.be.visible");
  });
});
