// const EMAIL = Cypress.env("USER_EMAIL");
// const PASSWORD = Cypress.env("USER_PASSWORD");
// const TOKEN = Cypress.env("USER_TOKEN");
// const USER_NAME = Cypress.env("USER_NAME");

const EMAIL = "megumi@noroff.no";
const PASSWORD = "11111111";
const USER_NAME = "Megumi";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Ik1lZ3VtaSIsImVtYWlsIjoibWVndW1pQG5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMjAvMDYvMjYvMDMvNTQveW91bmctNTM0MTU3N185NjBfNzIwLmpwZyIsImJhbm5lciI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTgvMTAvMTMvMTcvMzEvbGVhdmVzLTM3NDQ2NDlfOTYwXzcyMC5qcGciLCJpYXQiOjE2NzQ2NDY0NjF9.Hm8T9Ojgo2efGpUTTm29FLHkzFb91hk--YHPIJfgfXs";

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
