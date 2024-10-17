const COMPANY_ORIGIN = Cypress.env("COMPANY_ORIGIN");
class CompanyLoginPage {
  visit(param = '') {
    cy.step("Visitar web");
    cy.visit(`${COMPANY_ORIGIN}${param}`).wait(2000);
  }

  enterEmail(email) {
    cy.step("Introducir usuario");
    cy.get(':nth-child(1) > .pure-material-textfield-outlined > span').click();
    cy.get('#login-email-input').clear().type(email);
  }

  enterPassword(password) {
    cy.step("Introducir contraseña");
    cy.get('.p-t-24 > .pure-material-textfield-outlined > span').click();
    cy.get('#login-password-input').clear().type(password);
  }

  clickLogin() {
    cy.step("Login");
    cy.get('#login-submit-button').click();
  }

  clickForgotPassword() {
    cy.step("Recuperar contraseña");
    cy.get("#login-forgot-button").click();
  }
}

export default CompanyLoginPage;
