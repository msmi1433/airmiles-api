const { getAllDestinations } = require("./destinations.controller");
const { customErrorHandler } = require("./errors.controller");
module.exports = { getAllDestinations, customErrorHandler };
