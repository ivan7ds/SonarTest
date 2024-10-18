class MainPage {
  visit(param = "/app/transaction") {
    cy.step("Visitar web");
    cy.visit(`http://localhost:4200${param}`).wait(2000);
  }

  clickDrivers() {
    cy.step("Acceder a conductores");
    cy.get(
      "a.mat-mdc-list-item:nth-child(2) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1)"
    ).click();
  }

  clickInvoices() {
    cy.step("Acceder a Facturas");

    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
  }
  clickConfiguration() {
    cy.step("Acceder a Configuracion");

    cy.get(
      "a.mat-mdc-list-item:nth-child(4) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();

    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
    cy.get(
      "a.mat-mdc-list-item:nth-child(3) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
  }
  clickTransactions() {
    cy.step("Acceder a Transacciones");

    cy.get(
      "a.mat-mdc-list-item:nth-child(1) > span:nth-child(1) > span:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    ).click();
  }

  clickMyAccount() {
    cy.step("Acceder a Mi Cuenta");

    cy.get(".mat-icon").click();
    cy.get("button.mat-mdc-menu-item:nth-child(1)").should("be.visible");
    cy.get("button.mat-mdc-menu-item:nth-child(2)").should("be.visible");
  }

  clickLogout() {
    cy.step("Click en logout");
    cy.get("button.mat-mdc-menu-item:nth-child(2)").should("be.visible");
    cy.get(".button-alert > .mat-mdc-menu-item-text > .d-flex").click();
  }
}

export default MainPage;
