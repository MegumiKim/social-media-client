describe("valid user process", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(1000);
  });

  it("user can login with valid credentials", () => {
    cy.get("#registerForm button[data-auth='login']")
      .contains("Login")
      .should("be.visible")
      .click();
    cy.wait(1000);

    cy.get("input#loginEmail").type("megumi@noroff.no");
    cy.get("input#loginPassword").type("11111111");
    cy.wait(1000);

    cy.get("button[type='submit']").contains("Login").click();
    cy.wait(1000);
    expect(localStorage.getItem("token")).not.to.be.false;

    cy.get("button[data-auth='logout']").click();
    expect(localStorage.getItem("token")).not.to.exist;
  });
});
