require("@frsource/cypress-plugin-visual-regression-diff");
import { CompaniesApi } from "../request/companies_api";

const companiesApi = new CompaniesApi();
const apiHost = Cypress.env("BACKEND_URL");
let apiSchema;

Cypress.Commands.add("cargarSchemaSwagger", () => {
  if (!apiSchema) {
    return cy.task("loadSwaggerSchema").then((schema) => {
      apiSchema = schema;
      return schema;
    });
  }
  return cy.wrap(apiSchema);
});

Cypress.Commands.add("validarRespuestaAPI", (response, endpoint, method) => {
  cy.cargarSchemaSwagger().then((schema) => {
    const pathObj = schema.paths[endpoint]?.[method.toLowerCase()];
    if (!pathObj?.responses?.[response.status]) {
      throw new Error(
        `No se encontró el esquema de respuesta para el estado ${response.status} en el endpoint ${endpoint} usando el método ${method}`
      );
    }
    const endpointSchema = pathObj.responses[response.status];

    // Ajustamos el esquema según OpenAPI 3.0
    const responseSchema = endpointSchema.content?.["application/json"]?.schema;
    if (!responseSchema) {
      throw new Error(
        "No se encontró el esquema de respuesta JSON para validar."
      );
    }

    const Ajv = require("ajv");
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(responseSchema);
    if (!validate(response.body)) {
      throw new Error(
        `Error de validación: ${ajv.errorsText(validate.errors)}`
      );
    }
  });
});

Cypress.Commands.add("dbStopRecharge", (query, uuid) => {
  cy.task("executeQueryOverSSH", query.STATUS_QUERY).then((result) => {
    if (result[0].status == "Charging") {
      cy.step("Abrir cargador específico");
      cy.wait(1000);
      chargerPage.visit(uuid);
      chargerPage.detener_recarga();
    }
  });
});

Cypress.Commands.add("compareScreenshots", () => {
  cy.matchImage({
    diffConfig: {
      threshold: 0.01, // Sensibilidad de comparación al 1%
    },
    maxDiffThreshold: 0.05, // Permite hasta un 5% de diferencia
  });
});

Cypress.Commands.add("addCompanies", (testCase) => {
  companiesApi
    .postCompanies(testCase.body, testCase.response_code.post)
    .then((response) => {
      const companieId = response.body.id;
      companiesApi
        .getCompaniesList(testCase.response_code.get)
        .then((response) => {
          if (testCase.positive) {
            const ids = response.body.map((item) => item.id);
            expect(ids).to.include(companieId);
          }
        });
    });
});

Cypress.Commands.add("updateCompanie", (testCase) => {
  companiesApi.getCompaniesList(200).then((response) => {
    const companiesArray = response.body;
    const randomIndex = Math.floor(Math.random() * companiesArray.length);
    const randomCompany = companiesArray[randomIndex];

    companiesApi.getCompanie(randomCompany.id, 200);

    randomCompany.postalCode = "55555";

    if (testCase.id != null) {
      randomCompany.id = testCase.id;
    }

    companiesApi
      .patchCompanie(
        randomCompany.id,
        randomCompany,
        testCase.response_code.patch
      )
      .then((response) => {
        companiesApi
          .getCompanie(randomCompany.id, testCase.response_code.get)
          .then((response) => {
            if (testCase.positive) {
              expect(randomCompany.postalCode).to.include(
                response.body.postalCode
              );
            }
          });
      });
  });
});
