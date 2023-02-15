const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// require("../server");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  // apis: ["../routes/*.js"],
  // apis: ["../routes/school.routes.js"],
  apis: ["../server.js"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
      explorer: true,
    })
  );

  // Docs in Json format
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs are avialable at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
