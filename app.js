const express = require("express");

const app = express();

const {
  getAllDestinations,
  customErrorHandler,
  getEndpoints,
} = require("./controllers");

app.get("/api", getEndpoints);
app.get("/api/destinations", getAllDestinations);

app.use(customErrorHandler);

module.exports = app;
