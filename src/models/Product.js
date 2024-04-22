const { pool } = require("../db/dbConnection");

const Product = {
  create: ({ title, avatar, status, price, description, category, tags }) =>
    pool.query(
      "INSERT INTO products (title, avatar, status, price, description, category, tags) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [title, avatar, status, price, description, category, tags]
    ),
  findItemById: (id) =>
    pool.query("SELECT * FROM products WHERE id = $1", [id]),
  deleteItemById: (id) =>
    pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]),
};

module.exports = Product;
