describe("Overview Page Specs", () => {
  before(() => {
    cy.visit("/");
  });

  context("Wallet connect button", () => {
    it("should exist", () => {
      cy.findByText("Connect Wallet").should("exist");
    });
  });
});
