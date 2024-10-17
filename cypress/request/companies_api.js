// import { ErrorMng } from "../support/utils/error-mng";

// const errorMng = new ErrorMng();
const apiHost = Cypress.env("BACKEND_URL");
export class CompaniesApi {
  postCompanies(postBody, resCode, failOnStatusCode = false) {
    return cy
      .request({
        method: "POST",
        body: postBody,
        url: `${apiHost}/companies`,
        failOnStatusCode: failOnStatusCode,
      })
      .then((response) => {
        expect(response.status).to.eq(resCode);
        return cy.task("validateApiResponse", {
          response,
          endpoint: "/companies",
          method: "POST",
        }).then(() => {
          return response;
        })
      });
  }
  getCompaniesList(resCode, failOnStatusCode = false) {
    return cy
      .request({
        method: "GET",
        url: `${apiHost}/companies`,
        failOnStatusCode: failOnStatusCode,
      })
      .then((response) => {
        expect(response.status).to.eq(resCode);
        cy.task("validateApiResponse", {
          response,
          endpoint: "/companies",
          method: "GET",
        }).then(() => {
          return response;
        })
      });
  }
  getCompanie(id, resCode, failOnStatusCode = false) {
    return cy
      .request({
        method: "GET",
        url: `${apiHost}/companies/${id}`,
        failOnStatusCode: failOnStatusCode,
      })
      .then((response) => {
        expect(response.status).to.eq(resCode);
        return cy.task("validateApiResponse", {
          response,
          endpoint: `/companies/{id}`,
          method: "GET",
        }).then(() => {
          return response;
        })
      });
  }
  
  patchCompanie(id, body, resCode, failOnStatusCode = false) {
    return cy
      .request({
        method: "PATCH",
        body: body,
        url: `${apiHost}/companies/${id}`,
        failOnStatusCode: failOnStatusCode,
      })
      .then((response) => {
        expect(response.status).to.eq(resCode);
        cy.task("validateApiResponse", {
          response,
          endpoint: "/companies/{id}",
          method: "PATCH",
        }).then(() => {
          return response;
        })
      });
  }
}
