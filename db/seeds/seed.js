const db = require("../connection");

const seed = async () => {
  await db.query("DROP TABLE IF EXISTS british_airways;");
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
  return await db.query(`
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
};

module.exports = seed;
