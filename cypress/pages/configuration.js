class ConfigurationPage {
  check() {
    cy.get(".subtitle-corporate").contains(
      "Configura tu cuenta para adaptarla a tus necesidades y objetivos."
    );
  }
}

export default ConfigurationPage;
