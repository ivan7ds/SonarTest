import LoginPage from "../../../pages/login";
import CompanyLoginPage from "../../../pages/company_admin_login";
const testData = require('../../../fixtures/front/tc_002_dataset.json')
const loginPage = new LoginPage();
const companyLoginPage = new CompanyLoginPage();

describe("Soportar flujo autenticación usuario Okta: superadmin", () => {

  // beforeEach(() => {
  //   loginPage.visit();
  // });

  // testData.forEach((testCase) => {
  //   it(testCase.test_name, () => {
  //     companyLoginPage.visit();

  //   });
    
  // })

  it.skip("Usuario logeado en Okta navega a la vista de empresas y visualiza el detalle de una de las empresas", () => {

  });

  it.skip("Usuario en la vista de empresas cambia de tabs", () => {

  });

  it.skip("Usuario vuelve al listado de empresas con el boton volver", () => {

  });


});
