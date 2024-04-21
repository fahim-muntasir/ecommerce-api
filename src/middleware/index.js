const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const cors = require("cors");
const morgan = require("morgan");

const swaggerDoc = YAML.load("swagger.yaml");

const middleware = (app) => {
  app.use(morgan("combined"));
  app.use(cors());
  app.use(express.json());
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

module.exports = middleware;