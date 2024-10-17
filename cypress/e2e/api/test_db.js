describe("Consulta PostgreSQL con túnel SSH", () => {
    it("Debería abrir el túnel SSH, conectarse a la base de datos y realizar la consulta", () => {
      const query = "SELECT * FROM outbox_events WHERE event_type = 'com.efimob.ev-manager.location.updated'";
  
      cy.task('executeQueryOverSSH', query).then((result) => {
        cy.log("Resultado de la consulta:", result);
      });
    });
  });
  