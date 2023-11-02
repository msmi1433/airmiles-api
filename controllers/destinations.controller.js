const { selectAllDestinations } = require("../models");

exports.getAllDestinations = (req, res, next) => {
  const { points_balance, travel_class } = req.query;
  selectAllDestinations(points_balance, travel_class).then((destinations) => {
    res.status(200).send({ destinations });
  });
};
