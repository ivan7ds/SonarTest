const apiHost = Cypress.env("BACKEND_URL");
describe('Companies Endpoint', () => {
  let createdCompanyId;

  it('POST /companies - debe crear una nueva compañía', () => {
    const companyData = {
      name: 'Empresa de Prueba',
      documentType: 'CIF',
      documentNumber: 'B12345678',
      address: 'Calle Falsa 123',
      postalCode: '28080',
      province: 'Madrid',
      country: 'España',
      language: 'es',
    };

    cy.request('POST', `${apiHost}/companies`, companyData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      createdCompanyId = response.body.id;
      expect(response.body.name).to.eq(companyData.name);
    });
  });

  it('GET /companies - debe listar todas las compañías', () => {
    cy.request(`${apiHost}/companies`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });

  it('GET /companies/{id} - debe obtener una compañía por ID', () => {
    cy.request(`${apiHost}/companies/${createdCompanyId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(createdCompanyId);
    });
  });

  it('PATCH /companies/{id} - debe actualizar una compañía', () => {
    const updateData = {
      name: 'Empresa Actualizada',
    };

    cy.request('PATCH', `${apiHost}/companies/${createdCompanyId}`, updateData).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updateData.name);
    });
  });

  it('GET /companies/{id} - debe retornar 404 para una compañía no existente', () => {
    cy.request({
      url: `${apiHost}/companies/99999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error.code).to.eq('COMPANY_NOT_FOUND');
    });
  });
});
