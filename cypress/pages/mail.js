const apiHost = Cypress.env("BACKEND_URL");
class MailPage {
  visit(email, email_invalid=false) {
    cy.step("Visitar Correo");
    cy.visit(`http://localhost:8025/#`).wait(1000);

    if(email_invalid){
      cy.contains(email).should('not.exist');
    }else{
      cy.contains(email).should('exist');
    }
  }

  clickRecoveryUrl() {
    cy.step("Acceder a url de recuperacion de contraseña");
    cy.get(':nth-child(1) > .col-sm-4').click().wait(2000);
    cy.get('.nav > [ng-class="{ active: !hasHTML(preview) }"] > a').click();
    cy.xpath('//*[@id="preview-plain"]/a').then(($enlace) => {
      const url = $enlace.attr('href');
      cy.visit(url);
    });
  }
}

export default MailPage;
