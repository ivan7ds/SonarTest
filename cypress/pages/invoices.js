class InvoicesPage {
  check() {
    cy.get(".subtitle-corporate").contains(
      "Detalles relacionados con las facturas emitidas y los pagos realizados."
    );
  }
}

export default InvoicesPage;
