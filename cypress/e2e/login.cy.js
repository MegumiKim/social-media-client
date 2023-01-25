const EMAIL = Cypress.env("USER_EMAIL");
const PASSWORD = Cypress.env("USER_PASSWORD");
const TOKEN = Cypress.env("USER_TOKEN");
const USER_NAME = Cypress.env("USER_NAME");
// const accessToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Ik1lZ3VtaSIsImVtYWlsIjoibWVndW1pQG5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMjAvMDYvMjYvMDMvNTQveW91bmctNTM0MTU3N185NjBfNzIwLmpwZyIsImJhbm5lciI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTgvMTAvMTMvMTcvMzEvbGVhdmVzLTM3NDQ2NDlfOTYwXzcyMC5qcGciLCJpYXQiOjE2NzQ2NDY0NjF9.Hm8T9Ojgo2efGpUTTm29FLHkzFb91hk--YHPIJfgfXs";

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

    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?view=profile&name=${USER_NAME}`);
    });
  });
});
