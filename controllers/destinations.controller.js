const { selectAllDestinations } = require("../models");

exports.getAllDestinations = (req, res, next) => {
  selectAllDestinations().then((destinations) => {
    res.status(200).send({ destinations });
  });
};
