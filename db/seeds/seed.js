const db = require("../connection");
const fs = require("node:fs");
const { from: copyFrom } = require("pg-copy-streams");
const { pipeline } = require("node:stream/promises");

const seed = async () => {
  await db.query("DROP TABLE IF EXISTS british_airways CASCADE;");
  await db.query("DROP TABLE IF EXISTS users CASCADE;");
  await db.query("DROP TABLE IF EXISTS users_ba_destinations;");
  await db.query(`
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
  await db.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR,
            password_hash VARCHAR
        );`);
  await db.query(`
        CREATE TABLE users_ba_destinations (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id),
            destination_id INT REFERENCES british_airways(id)
        );`);
  const client = await db.connect();
  try {
    const ingestStream = client.query(
      copyFrom(`COPY british_airways 
      (city, country, economy_op, economy_p, p_economy_op, p_economy_p, business_op, business_p) 
      FROM STDIN DELIMITER ',' CSV HEADER;`)
    );
    const sourceStream = fs.createReadStream(
      `${__dirname}/../data/bachart.csv`
    );
    await pipeline(sourceStream, ingestStream);
  } finally {
    client.release();
  }
};

module.exports = seed;
