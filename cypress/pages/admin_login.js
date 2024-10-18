const ADMIN_ORIGIN = Cypress.env("ADMIN_ORIGIN");
class AdminLoginPage {
  visit(param = '') {
    cy.step("Visitar web");
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    cy.visit(`${ADMIN_ORIGIN}${param}`).wait(5000);
    
  }
}

export default AdminLoginPage;
