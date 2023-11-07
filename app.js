const express = require("express");
const helmet = require("helmet");

const app = express();

const {
  getAllDestinations,
  customErrorHandler,
  getEndpoints,
} = require("./controllers");

app.use(helmet());

app.get("/api", getEndpoints);
app.get("/api/destinations", getAllDestinations);

app.use(customErrorHandler);

module.exports = app;
