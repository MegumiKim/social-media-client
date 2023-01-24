describe("invalid user process", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);
  });

  it("fails user with invalid email", () => {
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
    expect("window:alert");
  });
});
