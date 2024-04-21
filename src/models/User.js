const { pool } = require("../db/dbConnection");

const User = {
  create: ({ name, email, password, role }) =>
    pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role]
    ),
  findByEmail: ({ email }) =>
    pool.query("SELECT * FROM users WHERE email = $1", [email]),
};

module.exports = User;
