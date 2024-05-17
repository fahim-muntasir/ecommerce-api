const { pool } = require("../db/dbConnection");

const User = {
  create: ({ name, email, password, role, googleid }) =>
    pool.query(
      "INSERT INTO profile (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role, googleid]
    ),
  findByEmail: ({ email }) =>
    pool.query("SELECT * FROM profile WHERE email = $1", [email]),
  find: ({ sortBy, sortOrder, limit, offset }) =>
    pool.query(
      `
        SELECT * FROM profile
        ORDER BY ${sortBy.toLowerCase()} ${sortOrder}
        LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    ),
  findAllItems: () => pool.query("SELECT COUNT(*) FROM profile"),
  findItemById: (id) => pool.query("SELECT * FROM profile WHERE id = $1", [id]),
  findItemByGoogleId: (id) =>
    pool.query("SELECT * FROM profile WHERE googleid = $1", [id]),
  deleteItemById: (id) =>
    pool.query("DELETE FROM profile WHERE id = $1 RETURNING *", [id]),
};

module.exports = User;
