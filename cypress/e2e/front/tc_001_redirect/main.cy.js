import CompanyLoginPage from "../../../pages/company_admin_login";
import AdminLoginPage from "../../../pages/admin_login";
import MainPage from "../../../pages/main";
import TransactionsPage from "../../../pages/transactions";
const companyLoginPage = new CompanyLoginPage();
const adminLoginPage = new AdminLoginPage();
const mainPage = new MainPage();
const transactionsPage = new TransactionsPage();

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

describe("Soportar flujo autenticación usuario Keycloak: company admin", () => {

  it("Usuario entra en la url principal sin loguearse", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    companyLoginPage.visit();
  
    cy.origin('http://localhost:8080', () => {
      cy.on('window:before:load', () => {
      });
      cy.location('origin').should('eq', 'http://localhost:8080');
    });
  });
  

  it("Usuario entra en la url principal sin loguearse con parametro /admin", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    companyLoginPage.visit("/admin");
  
    cy.origin('http://localhost:8080', () => {
      cy.on('window:before:load', () => {
      });
      cy.location('origin').should('eq', 'http://localhost:8080');
    });
  });

  it.skip("Usuario entra en la url ADMIN_ORIGIN sin loguearse y es redirigido a Okta", () => {
    adminLoginPage.visit();
  
    cy.origin('http://localhost:3000/okta/login', () => {
      cy.on('window:before:load', () => {
      });
      cy.location('origin').should('eq', 'http://localhost:3000/okta/login');
    });
  });


  it("Usuario entra en la url principal previamente logueado", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.session("usuario", loginSetup);
    mainPage.visit();
    transactionsPage.check();
  });

  it("Usuario entra en la url principal previamente logueado /admin", () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.session("usuario", loginSetup);
    mainPage.visit("/admin");
    transactionsPage.check();
  });

  it.skip("Usuario logeado en keycloak intenta acceder al host ADMIN_ORIGIN y es redirigido al login de Okta", () => {
    cy.session("usuario", loginSetup);
    adminLoginPage.visit();
  
    cy.origin('http://localhost:3000/okta/login', () => {
      cy.on('window:before:load', () => {
      });
      cy.location('origin').should('eq', 'http://localhost:3000');
    });
  });

});
