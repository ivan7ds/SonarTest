import CompanyLoginPage from "../../../pages/company_admin_login";
import RecoveryPage from "../../../pages/recovery";
import MailPage from "../../../pages/mail";
import TransactionsPage from "../../../pages/transactions";
const testData = require("./dataset.json");
const companyLoginPage = new CompanyLoginPage();
const recoveryPage = new RecoveryPage();
const transactionsPage = new TransactionsPage();
const mailPage = new MailPage();

describe("Recovery Password", () => {
  beforeEach(() => {
    cy.step("Visitar web");
    cy.visit(`http://localhost:8080/realms/corporate/protocol/openid-connect/auth?client_id=corporate-web&redirect_uri=http://localhost:4200&response_type=code`).wait(1000);
  });

  testData.forEach((testCase) => {
    it(testCase.test_name, () => {
      companyLoginPage.clickForgotPassword();
      recoveryPage.enterEmail(testCase.email);
      recoveryPage.recoveryButton();
      mailPage.visit(testCase.email, testCase.email_invalid);
      if(testCase.email_invalid){
        return
      }
      mailPage.clickRecoveryUrl();
      recoveryPage.readTerms();
      cy.go('back');
      recoveryPage.enterPassword(testCase.new_password);
      recoveryPage.confirmPassword(testCase.password);
      recoveryPage.confirmTerms();
      
      if (testCase.positive) {
        recoveryPage.clickNewPass();
        transactionsPage.check()
      } else {
        recoveryPage.checkNewPassDisabled();
        cy.contains('términos y condiciones').should('exist');
      }
    });
  });
});

