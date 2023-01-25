const EMAIL = Cypress.env("EMAIL");
const PASSWORD = Cypress.env("PASSWORD");
const TOKEN = Cypress.env("TOKEN");
const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Ik1lZ3VtaSIsImVtYWlsIjoibWVndW1pQG5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMjAvMDYvMjYvMDMvNTQveW91bmctNTM0MTU3N185NjBfNzIwLmpwZyIsImJhbm5lciI6Imh0dHBzOi8vY2RuLnBpeGFiYXkuY29tL3Bob3RvLzIwMTgvMTAvMTMvMTcvMzEvbGVhdmVzLTM3NDQ2NDlfOTYwXzcyMC5qcGciLCJpYXQiOjE2NzQ2NDY0NjF9.Hm8T9Ojgo2efGpUTTm29FLHkzFb91hk--YHPIJfgfXs";
const profile = {
  name: "Megumi",
  email: "megumi@noroff.no",
};

describe("logout", () => {
  it("delete access token after successful logout", () => {
    // cy.clearLocalStorage();
    localStorage.setItem("token", JSON.stringify(accessToken));
    localStorage.setItem("profile", JSON.stringify(profile));
    cy.wait(1000);

    cy.visit("/?view=profile&name=Megumi");
    cy.wait(1000);
    cy.get("button[data-auth='logout']")
      .click()
      .then(() => {
        // expect(cy.location("/"));

        expect(localStorage.getItem("token")).to.not.exist;
      });
  });
});
