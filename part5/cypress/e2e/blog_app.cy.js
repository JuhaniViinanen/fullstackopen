describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.visit("http://localhost:5173")
  })

  it("login form is shown", function() {
    cy.contains("log in to application")
    cy.get("#div-login-username")
    cy.get("#div-login-password")
    cy.get("#button-login")
  })
})
