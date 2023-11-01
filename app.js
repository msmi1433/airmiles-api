const express = require("express");

const app = express();

const { getAllDestinations } = require("./controllers");

app.get("/api/destinations", getAllDestinations);

module.exports = app;
