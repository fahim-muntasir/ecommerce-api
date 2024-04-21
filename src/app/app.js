require("dotenv").config("../../.env");
const express = require("express");
const middleware = require("../middleware");
const routes = require("../routes");
const { globalError, notfoundError } = require("./errors");

// express app
const app = express();

// all middlewares gonna use by this function
middleware(app);

// api routes
app.use("/api", routes);

// error handler
app.use(notfoundError);
app.use(globalError);

module.exports = app;
