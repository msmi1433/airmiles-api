const db = require("../db/connection");

exports.selectAllDestinations = (
  points_balance = undefined,
  travel_class = undefined,
  limit = 20
) => {
  let queryString = `SELECT * FROM british_airways`;
  let queryArray = [];

  if (isNaN(Number(limit))) {
    return Promise.reject({
      status: 404,
      msg: "limit must be a number",
    });
  }

  if (!["economy", "p_economy", "business", undefined].includes(travel_class)) {
    return Promise.reject({
      status: 404,
      msg: "invalid travel class",
    });
  }

  if (points_balance && !travel_class) {
    queryString += " WHERE economy_op <= $1";
    queryArray.push(points_balance);
  }

  if (points_balance && travel_class) {
    switch (travel_class) {
      case "economy":
        queryString += " WHERE economy_op <= $1";
        break;
      case "p_economy":
        queryString += " WHERE p_economy_op <= $1";
        break;
      case "business":
        queryString += " WHERE business_op <= $1";
        break;
    }
    queryArray.push(points_balance);
  }

  queryString += ` LIMIT ${limit};`;

  return db.query(queryString, queryArray).then(({ rows }) => {
    return rows;
  });
};
