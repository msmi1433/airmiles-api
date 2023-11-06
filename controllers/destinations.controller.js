const { selectAllDestinations } = require("../models");

exports.getAllDestinations = (req, res, next) => {
  const { points_balance, travel_class, limit, page } = req.query;
  selectAllDestinations(points_balance, travel_class, limit, page)
    .then((destinations) => {
      res.status(200).send({ destinations });
    })
    .catch((err) => {
      next(err);
    });
};
