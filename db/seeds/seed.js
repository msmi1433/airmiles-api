const db = require("../connection");

const seed = () => {
  return db
    .query("DROP TABLE IF EXISTS british_airways CASCADE;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users CASCADE;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS users_ba_destinations;");
    })
    .then(() => {
      return db.query(`
    CREATE TABLE british_airways (
        id SERIAL PRIMARY KEY,
        city VARCHAR,
        country VARCHAR,
        economy_op INT,
        economy_p INT,
        p_economy_op INT,
        p_economy_p INT,
        business_op INT,
        business_p INT
    );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            password_hash VARCHAR
        );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users_ba_destinations (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            destination_id INT REFERENCES british_airways(id)
        );`);
    })
    .then(() => {
      return db.query(`
        COPY british_airways(
            city,
            country,
            economy_op,
            economy_p,
            p_economy_op,
            p_economy_p,
            business_op,
            business_p) 
        FROM '${__dirname}/../data/bachart.csv' DELIMITER ',' CSV HEADER;`);
    });
};

module.exports = seed;
