const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Handyman API",
      version: "1.0.0",
      description: "A simple API to manage tasks",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./src/docs/*.js"],
});

module.exports = swaggerSpec;
