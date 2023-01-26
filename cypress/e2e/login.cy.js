// const EMAIL = Cypress.env("USER_EMAIL");
// const PASSWORD = Cypress.env("USER_PASSWORD");
// const USER_NAME = Cypress.env("USER_NAME");

const EMAIL = "megumi@noroff.no";
const PASSWORD = "11111111";
const USER_NAME = "Megumi";

describe("login", () => {
  it("saves access token in local storage and redirect the user to profile page", () => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);

    cy.get("#registerForm button[data-auth='login']")
      .contains("Login")
      .should("be.visible")
      .wait(500)
      .click()
      .wait(500);

    cy.get("input#loginEmail").type(EMAIL);
    cy.get("input#loginPassword").type(PASSWORD);
    cy.wait(500);

    cy.get("button[type='submit']")
      .contains("Login")
      .click()
      .wait(1000)
      .then(() => {
        expect(localStorage.getItem("token")).to.exist;
      });

    cy.location("search").should("eq", `?view=profile&name=${USER_NAME}`);
  });
});
