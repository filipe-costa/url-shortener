describe("Url Shortener E2E", () => {
  it("visits the home page", () => {
    cy.visit("/")
    cy.get('[data-testid="url-input"]').should("be.empty")
  })
})