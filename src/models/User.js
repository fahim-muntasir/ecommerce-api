const { pool } = require("../db/dbConnection");

const User = {
  create: ({ name, email, password, role }) =>
    pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role]
    ),
  findByEmail: ({ email }) =>
    pool.query("SELECT * FROM users WHERE email = $1", [email]),
  find: ({ sortBy, sortOrder, limit, offset }) =>
    pool.query(
      `
        SELECT * FROM users
        ORDER BY ${sortBy.toLowerCase()} ${sortOrder}
        LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    ),
  findAllItems: () => pool.query("SELECT COUNT(*) FROM users"),
  findItemById: (id) => pool.query("SELECT * FROM users WHERE id = $1", [id]),
  deleteItemById: (id) =>
    pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]),
};

module.exports = User;
