const apiHost = Cypress.env("BACKEND_URL");
class RecoveryPage {
  enterEmail(email) {
    cy.step("Introducir usuario");
    cy.get(".pure-material-textfield-outlined > span").click();
    cy.get("#reset-email-input").clear().type(email);
  }

  recoveryButton(){
    cy.step("Click Recuperar Password");
    cy.get("#reset-submit-button").click().wait(2000);
    cy.contains('Revisa tu correo electrónico').should('exist');
    cy.contains('Hemos enviado un email con las instrucciones para recuperar tu contraseña. Si no lo visualizas, revisa tu bandeja de spam.').should('exist');
  }
  
  enterPassword(new_password) {
    cy.step("Introducir Password");
    cy.get('#password-new-container > .pure-material-textfield-outlined > span').click();
    cy.get('#password-new').clear().type(new_password.capital);
    cy.get('#uppercase-lowercase').should('have.css', 'color', 'rgb(80, 205, 137)');
    cy.get('#password-new').type(new_password.long);
    cy.get('#min-length').should('have.css', 'color', 'rgb(80, 205, 137)');
    cy.get('#password-new').type(new_password.number);
    cy.get('#number-char').should('have.css', 'color', 'rgb(80, 205, 137)');
    cy.get('#password-new').type(new_password.special);
    cy.get('#special-char').should('have.css', 'color', 'rgb(80, 205, 137)');
    cy.compareScreenshots();
  }

  confirmPassword(password) {
    cy.step("Introducir Password");
    cy.get('.p-t-24 > .pure-material-textfield-outlined > span').click();
    cy.get('#password-confirm').clear().type(password);
  }

  readTerms(){
    cy.get('#login-form > div.d-flex.flex-row.w-100.p-t-24.align-content-center > div > a').invoke('removeAttr', 'target').click();
  }

  confirmTerms() {
    cy.step("Confirmar Terminos y Condiciones");
    cy.get('.pure-material-checkbox > span').click();
    cy.get('#terms-checkbox').check();
  }

  clickNewPass() {
    cy.get('#update-submit-button').click();
  }
  
  checkNewPassDisabled() {
    cy.get('#update-submit-button').should('be.disabled')
  }
}

export default RecoveryPage;
