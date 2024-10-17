const apiHost = Cypress.env("BACKEND_URL");
class LoginPage {
  visit() {
    cy.step("Visitar web");
    cy.visit(`http://localhost:8080/realms/corporate/protocol/openid-connect/auth?client_id=corporate-web&redirect_uri=http://localhost:4200&response_type=code`).wait(1000);
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

export default LoginPage;
