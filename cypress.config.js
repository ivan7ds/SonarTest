const { spawn } = require("child_process");
const { Client } = require("pg");
const { defineConfig } = require("cypress");
const {
  initPlugin,
} = require("@frsource/cypress-plugin-visual-regression-diff/plugins");
const SwaggerParser = require("swagger-parser");
const path = require("path");
const Ajv = require("ajv");
require("dotenv").config();

let apiSchema;
const shouldFailOnInvalidSchema = false;

module.exports = defineConfig({
  e2e: {
    env: {
      BACKEND_URL: process.env.BACKEND_URL,
      COMPANY_ORIGIN: process.env.COMPANY_ORIGIN,
      ADMIN_ORIGIN: process.env.ADMIN_ORIGIN,
    },
    setupNodeEvents(on, config) {
      initPlugin(on, config);

      on("task", {
        executeQueryOverSSH(query) {
          return new Promise((resolve, reject) => {
            const sshTunnel = spawn("ssh", [
              "-i",
              process.env.SSH_KEY_PATH,
              "-L",
              `${process.env.LOCAL_PORT}:${process.env.DB_HOST}:${process.env.DB_PORT}`,
              `${process.env.SSH_USER}@${process.env.SSH_HOST}`,
            ]);

            // Manejo de errores en el túnel SSH
            sshTunnel.on("error", (err) => {
              console.error("Error estableciendo el túnel SSH:", err);
              reject(err);
            });

            setTimeout(async () => {
              let client; // Declaramos client aquí para que sea accesible en el bloque finally
              try {
                console.log("Túnel SSH abierto, ejecutando consulta...");

                // Paso 2: Establecer la conexión a PostgreSQL
                client = new Client({
                  host: "localhost",
                  user: process.env.DB_USER,
                  password: process.env.DB_PASSWORD,
                  database: process.env.DB_NAME,
                  port: process.env.LOCAL_PORT,
                });

                await client.connect(); // Conexión a PostgreSQL

                // Ejecutar la consulta SQL
                const res = await client.query(query);
                console.log("Consulta ejecutada exitosamente:", res.rows);

                await client.end(); // Cierra la conexión a PostgreSQL
                sshTunnel.kill(); // Cierra el túnel SSH

                resolve(res.rows); // Devuelve el resultado de la consulta
              } catch (err) {
                console.error("Error ejecutando la consulta PostgreSQL:", err);
                // No necesitamos cerrar client aquí, se manejará en el bloque finally
                sshTunnel.kill(); // Asegurarse de cerrar el túnel en caso de error
                reject(new Error(err));
              } finally {
                if (client) {
                  await client.end();
                }
                sshTunnel.kill(); // Asegurarse de cerrar el túnel en caso de error
              }
            }, 5000); // Espera 5 segundos para asegurarse de que el túnel esté activo
          });
        },

        async validateApiResponse({ response, endpoint, method }) {
          const swaggerPath = path.resolve("cypress/fixtures/doc/swagger.yaml");
          try {
            if (!apiSchema) {
              apiSchema = await SwaggerParser.validate(swaggerPath);
            }
        
            const schema = apiSchema;
            const pathObj = getPathObject(schema, endpoint, method);
            const responseStatusSchema = getResponseStatusSchema(pathObj, response.status, endpoint, method);
        
            const responseSchema = getResponseSchema(responseStatusSchema);
            validateResponse(response.body, responseSchema);
        
            return { valid: true };
        
          } catch (error) {
            return handleValidationError(error);
          }
        }
                
      });

      return config;
    },
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  experimentalStudio: true,
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/logs",
    "overwrite": false,
    "html": false,
    "json": true
  },
  retries: {
    runMode: 3,
    openMode: 0,
  },
});



function getPathObject(schema, endpoint, method) {
  const pathObj = schema.paths[endpoint]?.[method.toLowerCase()];
  if (!pathObj?.responses) {
    throwOrWarn(
      `No se encontró el esquema de respuesta para el estado ${response.status} en el endpoint ${endpoint} usando el método ${method}`
    );
  }
  return pathObj;
}

function getResponseStatusSchema(pathObj, status, endpoint, method) {
  const responseStatusSchema = pathObj.responses[status];
  if (!responseStatusSchema) {
    throwOrWarn(
      `No se encontró el esquema de respuesta para el estado ${status} en el endpoint ${endpoint} usando el método ${method}`
    );
  }
  return responseStatusSchema;
}

function getResponseSchema(responseStatusSchema) {
  const responseSchema = responseStatusSchema.content?.["application/json"]?.schema;
  if (!responseSchema) {
    throwOrWarn("No se encontró el esquema de respuesta JSON para validar.");
  }
  return responseSchema;
}

function validateResponse(body, responseSchema) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(responseSchema);
  const valid = validate(body);

  if (!valid) {
    throwOrWarn(`Error de validación: ${ajv.errorsText(validate.errors)}`);
  }
}

function throwOrWarn(message) {
  if (shouldFailOnInvalidSchema) {
    throw new Error(message);
  } else {
    console.warn(message);
    return { valid: false, error: message };
  }
}

function handleValidationError(error) {
  console.error("Error al validar el esquema:", error);
  if (shouldFailOnInvalidSchema) {
    throw error;
  } else {
    return {
      valid: false,
      error: "Error al validar el esquema: " + error.message,
    };
  }
}