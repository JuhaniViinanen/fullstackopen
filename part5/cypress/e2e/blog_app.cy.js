describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users", {
      "username": "squarebob117",
      "password": "supersecret",
      "name": "Spongebob"
    })
    cy.visit("http://localhost:5173")
  })

  it("login form is shown", function() {
    cy.contains("log in to application")
    cy.get("#div-login-username")
    cy.get("#div-login-password")
    cy.get("#button-login")
  })

  describe("Login", function() {
    it("succeeds with right credentials", function() {
      cy.contains("username")
        .find("input")
        .type("squarebob117")
      cy.contains("password")
        .find("input")
        .type("supersecret")
      cy.contains("login")
        .click()
      cy.contains("Spongebob logged in")
    })

    it("fails with wrong crendetials", function() {
      cy.contains("username")
        .find("input")
        .type("squarebob117")
      cy.contains("password")
        .find("input")
        .type("password1234")
      cy.contains("login")
        .click()
      cy.get(".errorMessage")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")

      cy.get("html")
        .should("not.contain", "Spongebob logged in")
    })
  })
})
