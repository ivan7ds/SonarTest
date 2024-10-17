import './commands';
import 'cypress-plugin-steps';
require('cypress-xpath');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.config('defaultCommandTimeout', 10000);

// Ejemplo de sobrescribir un comando de Cypress
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn(url, {
    ...options,
    onBeforeLoad(win) {
      // Puedes modificar el comportamiento aquí
    }
  });
});
