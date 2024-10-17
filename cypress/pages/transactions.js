class TransactionsPage {
  check() {
    cy.get(".subtitle-corporate").contains(
      "Registro de todas las transacciones realizadas por los conductores."
    );
  }

  clickTransactions() {
    cy.get(".subtitle-corporate").contains(
      "Registro de todas las transacciones realizadas por los conductores."
    );
    cy.get(
      ".no-data-container > div:nth-child(1) > app-svg-loader:nth-child(1) > div:nth-child(1)"
    ).click();
    cy.get(".primary-card").should("be.visible");
  }
}

export default TransactionsPage;
