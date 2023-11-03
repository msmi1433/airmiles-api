const express = require("express");

const app = express();

const { getAllDestinations, customErrorHandler } = require("./controllers");

app.get("/api/destinations", getAllDestinations);

app.use(customErrorHandler);

module.exports = app;
