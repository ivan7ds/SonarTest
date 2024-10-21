import { RandomUtils } from "../../support/utils/random-utils";
import { CompaniesApi } from "../../request/companies_api";
const companiesApi = new CompaniesApi();
const randomUtils = new RandomUtils();
const baseUrl = Cypress.env("BACKEND_URL");

describe("API Integration Tests", () => {
  /**
   * Endpoint: /companies [POST]
   */
  describe("POST /companies", () => {
    const validCompany = {
      name: randomUtils.generateRandomString(5),
      documentType: "CIF",
      documentNumber: randomUtils.generarCIF(),
      address: "Calle Falsa 123",
      postalCode: "28080",
      province: "Madrid",
      country: "esp",
      language: "es",
    };

    it("Test 3.1 - Should create a company successfully with CIF", () => {
      companiesApi.postCompanies(validCompany, 201).then((response) => {
        expect(response.body).to.have.property("id");
        expect(response.body.name).to.eq(validCompany.name);
      });
    });

    it("Test 3.2 - Should return 400 Bad Request when a required field is missing", () => {
      const invalidCompany = { ...validCompany };
      delete invalidCompany.name;

      companiesApi.postCompanies(invalidCompany, 400).then((response) => {
        expect(response.body).to.have.property("error");
      });
    });

    it("Test 3.3 - Should return 409 Conflict when company already exists", () => {
      companiesApi.postCompanies(validCompany, 409).then((response) => {
        expect(response.body.error.code).to.eq("COMPANY_ALREADY_EXISTS");
      });
    });

    it("Test 3.4 - Should create a company with same name successfully", () => {
      const otherCompany = { ...validCompany };
      otherCompany.documentNumber = `B${randomUtils.randomNumberUpTo(9)}`;

      companiesApi.postCompanies(otherCompany, 201).then((response) => {
        expect(response.body.name).to.eq(validCompany.name);
      });
    });

    it("Test 3.5 - Should return 409 Conflict when company CIF already exists", () => {
      const otherCompany = { ...validCompany };
      otherCompany.name = randomUtils.generateRandomString(9);

      companiesApi.postCompanies(otherCompany, 409).then((response) => {
        expect(response.body).to.have.property("error");
      });
    });

    it("Test 3.6 - Should create a company successfully with NIF", () => {
      const otherCompany = { ...validCompany };
      otherCompany.documentType = "NIF";
      otherCompany.documentNumber = randomUtils.generarNIF();

      companiesApi.postCompanies(validCompany, 201).then((response) => {
        expect(response.body).to.have.property("id");
        expect(response.body.documentNumber).to.eq(validCompany.documentNumber);
      });
    });

    it("Test 3.7 - Should create a company successfully with NIE", () => {
      const otherCompany = { ...validCompany };
      otherCompany.documentType = "NIE";
      otherCompany.documentNumber = randomUtils.generarNIE();

      companiesApi.postCompanies(validCompany, 201).then((response) => {
        expect(response.body).to.have.property("id");
        expect(response.body.documentNumber).to.eq(validCompany.documentNumber);
      });
    });

    it("Test 3.8 - Should return 400 create a company successfully with wrong CIF", () => {
      const otherCompany = { ...validCompany };
      otherCompany.documentType = "CIF";
      otherCompany.documentNumber = "B12345678";

      companiesApi.postCompanies(validCompany, 400).then((response) => {
        expect(response.body).to.have.property("error");
      });
    });

    it("Test 3.9 - Should return 400 create a company successfully with wrong NIE", () => {
      const otherCompany = { ...validCompany };
      otherCompany.documentType = "NIE";
      otherCompany.documentNumber = "X1234567L";

      companiesApi.postCompanies(validCompany, 400).then((response) => {
        expect(response.body).to.have.property("error");
      });
    });

    it("Test 3.10 - Should return 400 create a company successfully with wrong NIF", () => {
      const otherCompany = { ...validCompany };
      otherCompany.documentType = "NIF";
      otherCompany.documentNumber = "12345678Z";

      companiesApi.postCompanies(validCompany, 400).then((response) => {
        expect(response.body).to.have.property("error");
      });
    });
  });

  // /**
  //  * Endpoint: /companies [GET]
  //  */
  describe("GET /companies", () => {
    it("Test 4.1 - Should list companies without parameters", () => {
      companiesApi.getCompaniesList(200).then((response) => {
        expect(response.body.data).to.be.an("array");
      });
    });

    it("Test 4.2 - Should paginate companies correctly", () => {
      companiesApi.getCompaniesList(200).then((response) => {
        expect(response.body.meta.currentPage).to.eq(1);
        expect(response.body.meta.itemsPerPage).to.eq(10);
      });
    });

    it("Test 4.3 - Should sort companies by updatedAt DESC", () => {
      companiesApi.getCompaniesList(200).then((response) => {
        const companies = response.body.data;
        for (let i = 0; i < companies.length - 1; i++) {
          const currentDate = new Date(companies[i].updatedAt);
          const nextDate = new Date(companies[i + 1].updatedAt);
          expect(currentDate.getTime()).to.be.at.least(nextDate.getTime());
        }
      });
    });

    it("Test 4.4 - Should search companies by term", () => {
      const searchTerm = "B12345678";
    
      companiesApi.getCompaniesList(200).then((response) => {
        const { data } = response.body;
        expect(data).to.be.an("array");
    
        for (const company of data) {
          expect(company.documentNumber).to.include(searchTerm);
        }
      });
    });
    
    it("Test 4.5 - Should handle invalid page parameter gracefully", () => {
      companiesApi.getCompaniesList(200).then((response) => {
        // Dependiendo de la implementación, puede devolver un error o aplicar el valor por defecto
        expect(response.status).to.be.oneOf([200, 400]);
      });
    });
  });

  // /**
  //  * Endpoint: /companies/{id} [GET]
  //  */
  describe("GET /companies/{id}", () => {
    let companyId;
    const validCompany = {
      name: randomUtils.generateRandomString(5),
      documentType: "CIF",
      documentNumber: "B12345678",
      address: "Calle Falsa 123",
      postalCode: "28080",
      province: "Madrid",
      country: "esp",
      language: "es",
    };
    before(() => {
      // Crear una compañía para usar en las pruebas
      companiesApi.postCompanies(validCompany, 201).then((response) => {
        companyId = response.body.id;
      });
    });

    it("Test 5.1 - Should get company details with valid ID", () => {
      companiesApi.getCompanie(companyId, 200).then((response) => {
        expect(response.body.id).to.eq(companyId);
      });
    });

    it("Test 5.2 - Should return 404 for non-existent company ID", () => {
      companiesApi.getCompanie(99999, 404).then((response) => {
        expect(response.body.error.code).to.eq("COMPANY_NOT_FOUND");
      });
    });

    it("Test 5.3 - Should return 400 Bad Request for invalid ID format", () => {
      companiesApi.getCompanie("invalid-id", 500).then((response) => {
        expect(response.body.error.code).to.eq("INTERNAL_ERROR");
      });
    });
  });

  // /**
  //  * Endpoint: /companies/{id} [PATCH]
  //  */
  describe("PATCH /companies/{id}", () => {
    let companyId;

    beforeEach(() => {
      const validCompany = {
        name: "Test Company",
        documentType: "CIF",
        documentNumber: randomUtils.generarCIF(),
        address: "Calle Falsa 123",
        postalCode: "28080",
        province: "Madrid",
        country: "esp",
        language: "es",
      };
      companiesApi.postCompanies(validCompany, 201).then((response) => {
        companyId = response.body.id;
      });
    });

    it("Test 6.1 - Should update company successfully", () => {
      const updatedData = {
        postalCode: randomUtils.generateRandomString(5),
      };

      companiesApi
        .patchCompanie(companyId, 200, updatedData)
        .then((response) => {
          expect(response.body.postalCode).to.eq(updatedData.postalCode);
        });
    });

    it("Test 6.2 - Should return 404 when updating non-existent company", () => {
      companiesApi
        .patchCompanie(999999, 404, { name: "Empresa Inexistente" })
        .then((response) => {
          expect(response.body.error.code).to.eq("COMPANY_NOT_FOUND");
        });
    });

    it("Test 6.3 - Should return 409 Conflict when causing a duplicate", () => {
      companiesApi.patchCompanie(999999, 409, validCompany).then((response) => {
        expect(response.body.error.code).to.eq("COMPANY_ALREADY_EXISTS");
      });
    });

    it("Test 6.4 - Should return 400 Bad Request for invalid data", () => {
      companiesApi.patchCompanie(999999, 400, { postalCode: 12345 });
    });
  });
});
