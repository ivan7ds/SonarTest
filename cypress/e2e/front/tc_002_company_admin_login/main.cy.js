import CompanyLoginPage from "../../../pages/company_admin_login";
import AdminLoginPage from "../../../pages/admin_login";
import MainPage from "../../../pages/main";
import TransactionsPage from "../../../pages/transactions";
const testData = require('./dataset.json')
const companyLoginPage = new CompanyLoginPage();
const adminLoginPage = new AdminLoginPage();
const mainPage = new MainPage();
const transactionsPage = new TransactionsPage();

const loginSetup = () => {
  cy.visit(`http://localhost:8080/realms/corporate/protocol/openid-connect/auth?client_id=corporate-web&redirect_uri=http://localhost:4200&response_type=code`);
  companyLoginPage.enterEmail("test@test.test");
  companyLoginPage.enterPassword("Corporate2024*");
  companyLoginPage.clickLogin();
}

before(() => {
  cy.session("usuario", loginSetup);
});

describe("Autenticación company admin", () => {

  testData.forEach((testCase) => {
    it(testCase.test_name, () => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit('http://localhost:8080/realms/corporate/protocol/openid-connect/auth?client_id=corporate-web&redirect_uri=http://localhost:4200&response_type=code')
      // companyLoginPage.visit();
      companyLoginPage.enterEmail(testCase.email);
      companyLoginPage.enterPassword(testCase.password);
      companyLoginPage.clickLogin();

      if(testCase.positive){
        transactionsPage.check();
      }else{
        cy.contains('Error de usuario o contraseña').should('exist');
      }
    });
    
  })

});
