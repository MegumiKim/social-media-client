const USER_NAME = Cypress.env("USER_NAME");

describe("login with invalid credentials", () => {
  it("fails an user with invalid email", () => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);

    cy.get("#registerForm button[data-auth='login']")
      .contains("Login")
      .should("be.visible")
      .click();
    cy.wait(1000);

    cy.get("input#loginEmail").type("invalid@noroff.no");
    cy.get("input#loginPassword").type("invalidPassword");
    cy.wait(1000);

    cy.get("button[type='submit']").contains("Login").click();
    cy.wait(1000);
    cy.on("window:alert", (txt) => {
      expect(txt).to.eq(
        "Either your username was not found or your password is incorrect"
      );
    });
  });

  it("refuse an user to visit profile page without login", () => {
    cy.visit(`/?view=profile&name=${USER_NAME}`);
    cy.wait(1000);
    cy.location("pathname").should("eq", "/");
  });
});
