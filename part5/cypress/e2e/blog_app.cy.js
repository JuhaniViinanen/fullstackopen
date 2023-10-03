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

  describe("when logged in", function() {
    beforeEach(function() {
      cy.login({ username: "squarebob117", password: "supersecret" })
    })

    it("a new blog can be created", function() {
      cy.contains("new blog").click()
      cy.get("#blog-title-input").type("Testing with Cypress")
      cy.get("#blog-author-input").type("Anonymous")
      cy.get("#blog-url-input").type("http://cypress.com")
      cy.contains("create").click()

      cy.contains("blog Testing with Cypress created.")
      cy.contains("Testing with Cypress Anonymous")
    })

    describe("and a blog exists", function() {
      beforeEach(function() {
        cy.createBlog({ title: "Testing", author: "Anon", url: "http://notreal.cs" })
      })

      it("it can be liked", function() {
        cy.contains("Testing Anon").parent().as("test1")
        cy.get("@test1").contains("more").click()
        cy.get("@test1")
          .should("contain", "0")
          .and("not.contain", "1")
        cy.get("@test1").contains("like").click()
        cy.get("@test1")
          .should("contain", "1")
          .and("not.contain", "0")
      })

      it("it can be deleted", function() {
        cy.on("window:confirm", function(str) {
          expect(str).to.eq("Delete blog Testing by Anon?")
        })
        cy.contains("Testing Anon").parent().as("test1")
        cy.get("@test1").contains("more").click()
        cy.get("@test1").contains("delete").click()
        cy.get("html")
          .should("contain", "Testing by Anon deleted")
          .and("not.contain", "Testing Anon")
      })

      it("it can only be deleted by it's creator", function() {
        cy.request("POST", "http://localhost:3003/api/users", {
          "username": "patrick",
          "password": "patrick",
          "name": "patrick"
        })
        cy.login({ username: "patrick", password: "patrick" })
        cy.contains("Testing Anon").parent().as("test1")
        cy.get("@test1").contains("more").click()
        cy.get("@test1").should("not.contain", "delete")
      })
    })
  })
})
