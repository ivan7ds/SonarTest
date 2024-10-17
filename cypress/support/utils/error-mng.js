export class ErrorMng {
    checkStatus(response) {
      try {
        expect(response.status).to.eq(200);
      } catch (error) {
        Cypress.log({
          name: "Status Check",
          message: "La solicitud no devolvió un estado 200",
          consoleProps: () => {
            return {
              Status: response.status,
              Error: error.message,
            };
          },
        });
      }
    }
  }
  