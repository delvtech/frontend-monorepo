/* eslint-disable testing-library/await-async-utils */
/* eslint-disable ui-testing/no-hard-wait */
/* eslint-disable cypress/no-unnecessary-waiting */

describe("Overview Page Specs", () => {
  before(() => {
    cy.visit("/");
  });

  context("Wallet connect button", () => {
    it("should exist", () => {
      cy.findByTestId("wallet-btn").should("exist");
    });

    it("should be clickable", () => {
      cy.findByTestId("wallet-btn").click();
      cy.findByText("MetaMask").should("exist");
      cy.findByText("MetaMask").click();

      cy.wait(1000);
      cy.acceptMetamaskAccess();
    });
  });
});
