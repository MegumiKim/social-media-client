const EMAIL = Cypress.env("USER_EMAIL");
const PASSWORD = Cypress.env("USER_PASSWORD");
const TOKEN = Cypress.env("USER_TOKEN");
const USER_NAME = Cypress.env("USER_NAME");

const profile = {
  name: USER_NAME,
  email: EMAIL,
};

describe("logout", () => {
  it("delete access token after successful logout", () => {
    localStorage.setItem("token", JSON.stringify(TOKEN));
    localStorage.setItem("profile", JSON.stringify(profile));
    cy.wait(1000);

    cy.visit(`/?view=profile&name=${USER_NAME}`);
    cy.wait(1000);
    cy.get("button[data-auth='logout']")
      .click()
      .then(() => {
        expect(localStorage.getItem("token")).to.not.exist;
        expect(localStorage.getItem("profile")).to.not.exist;
      });
    cy.location("pathname").should("eq", "/");
  });
});
