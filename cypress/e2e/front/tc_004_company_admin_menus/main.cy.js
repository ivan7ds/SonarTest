import CompanyLoginPage from "../../../pages/company_admin_login";
import ConfigurationPage from "../../../pages/configuration";
import DriversPage from "../../../pages/drivers";
import InvoicesPage from "../../../pages/invoices";
import TransactionsPage from "../../../pages/transactions";
import MainPage from "../../../pages/main";
const companyLoginPage = new CompanyLoginPage();
const configurationPage = new ConfigurationPage();
const driversPage = new DriversPage();
const invoicesPage = new InvoicesPage();
const transactionsPage = new TransactionsPage();
const mainPage = new MainPage();

const loginSetup = () => {
  cy.fixture("corporate_credentials").then((data) => {
    cy.visit(`http://localhost:8080/realms/corporate/protocol/openid-connect/auth?client_id=corporate-web&redirect_uri=http://localhost:4200&response_type=code`);
    companyLoginPage.enterEmail(data.email);
    companyLoginPage.enterPassword(data.password);
    companyLoginPage.clickLogin();
  })
}

before(() => {
  cy.session("usuario", loginSetup);
});

describe("Estructura de menú y cabecera para el company admin", () => {

  it("Recorrer menus", () => {
    cy.session("usuario", loginSetup);
    mainPage.visit();
    transactionsPage.clickTransactions();
    mainPage.clickDrivers();
    driversPage.check();
    mainPage.clickInvoices();
    invoicesPage.check();
    mainPage.clickConfiguration();
    configurationPage.check();
    mainPage.clickTransactions();
    transactionsPage.check();
  });

  it("Comprobar opciones de usuario", () => {
    cy.session("usuario", loginSetup);
    mainPage.visit();
    mainPage.clickMyAccount();
  });

  it("Visualizar transacciones", () => {
    cy.session("usuario", loginSetup);
    mainPage.visit();
    transactionsPage.clickTransactions();
  });

  it("Usuario entra en la url principal sin loguearse", () => {
    mainPage.visit();
  });

  it("Usuario entra en la url principal sin loguearse con parametro /admin", () => {
    mainPage.visit("/admin");
  });

  it("Usuario entra en la url principal logeado con parametro /admin", () => {
    mainPage.visit("/admin");
  });

  it("Usuario entra en la url principal logeado y se dirige a un apartado no existente", () => {
    mainPage.visit("/noExisteUrl");
    cy.compareScreenshots();
  });

  it("Logout", () => {
    cy.session("usuario", loginSetup);
    mainPage.visit();
    mainPage.clickMyAccount();
    mainPage.clickLogout();
  });

});