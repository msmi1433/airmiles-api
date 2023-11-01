const db = require("../db/connection");

exports.selectAllDestinations = (limit = 20) => {
  return db
    .query("SELECT * FROM british_airways LIMIT $1", [limit])
    .then(({ rows }) => {
      return rows;
    });
};
