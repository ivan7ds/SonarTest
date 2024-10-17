class DriversPage {

  check(){
    cy.get('.subtitle-corporate').contains('Listado de usuarios que pueden utilizar el método de pago de la empresa.');
  }

}

export default DriversPage;
