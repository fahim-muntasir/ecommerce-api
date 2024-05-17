require("dotenv").config("../../.env");
const express = require("express");
const middleware = require("../middleware");
const routes = require("../routes");
const { globalError, notfoundError } = require("./errors");
const orderController = require("../api/v1/order")

// express app
const app = express();

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  orderController.webhook
);

// all middlewares gonna use by this function
middleware(app);

// api routes
app.use("/api", routes);

// error handler
app.use(notfoundError);
app.use(globalError);

module.exports = app;
