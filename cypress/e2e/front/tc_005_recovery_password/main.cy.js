import LoginPage from "../../../pages/login";
import RecoveryPage from "../../../pages/recovery";
import MailPage from "../../../pages/mail";
import TransactionsPage from "../../../pages/transactions";
const testData = require("./dataset.json");
const loginPage = new LoginPage();
const recoveryPage = new RecoveryPage();
const transactionsPage = new TransactionsPage();
const mailPage = new MailPage();

describe("Recovery Password", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  testData.forEach((testCase) => {
    it(testCase.test_name, () => {
      loginPage.clickForgotPassword();
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

