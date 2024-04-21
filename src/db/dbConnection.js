const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "admin",
  port: 5432,
});

const connectDB = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err, _client, release) => {
      if (err) {
        return reject(err);
      }
      console.log("Connected to the database");
      release();
      resolve();
    });
  });
};

module.exports = { dbConnection: connectDB, pool };
