import { RandomUtils } from "../../support/utils/random-utils";
const tc101Data = require("../../fixtures/api/tc_101_dataset.json");
const tc102Data = require("../../fixtures/api/tc_102_dataset.json");
const randomUtils = new RandomUtils();

describe("Validacion de endpoints /companie", () => {
  tc101Data.forEach((testCase) => {
    it(testCase.test_name, () => {

      if(testCase.body.name === null){
        testCase.body.name = randomUtils.generateRandomString(5);
      }
      cy.addCompanies(testCase);
    });
  });
  tc102Data.forEach((testCase) => {
    it(testCase.test_name, () => {
      cy.updateCompanie(testCase);
      tc102Data.forEach((testCase) => {
        it(testCase.test_name, () => {
          cy.updateCompanie(testCase);
          tc102Data.forEach((testCase) => {
            it(testCase.test_name, () => {
              cy.updateCompanie(testCase);
              tc102Data.forEach((testCase) => {
                it(testCase.test_name, () => {
                  cy.updateCompanie(testCase);
                  tc102Data.forEach((testCase) => {
                    it(testCase.test_name, () => {
                      cy.updateCompanie(testCase);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
