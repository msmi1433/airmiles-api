const { getAllDestinations } = require("./destinations.controller");
const { customErrorHandler } = require("./errors.controller");
const { getEndpoints } = require("./endpoints.controller");
module.exports = { getAllDestinations, customErrorHandler, getEndpoints };
