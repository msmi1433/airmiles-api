const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

const {
  getAllDestinations,
  customErrorHandler,
  getEndpoints,
} = require("./controllers");

app.use(helmet());
app.use(cors());

app.get("/api", getEndpoints);
app.get("/api/destinations", getAllDestinations);

app.use(customErrorHandler);

module.exports = app;
