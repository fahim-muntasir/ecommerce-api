const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const morgan = require("morgan");

const swaggerDoc = YAML.load("swagger.yaml");

const middleware = (app) => {
  // Middleware for /api routes
  const apiMiddleware = express.Router();
  apiMiddleware.use(morgan("combined"));
  app.use(cors());
  apiMiddleware.use(express.json());

  // Mount the API middleware on the /api route
  app.use("/api/v1", apiMiddleware);

  // Serve Swagger documentation at /docs
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

module.exports = middleware;