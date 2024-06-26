const { pool } = require("../db/dbConnection");

const Product = {
  create: ({ title, avatar, status, price, discount, description, category, tags }) =>
    pool.query(
      "INSERT INTO products (title, avatar, status, price, description, category, tags, discount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [title, avatar, status, price, description, category, tags, discount]
    ),
  findItemById: (id) =>
    pool.query("SELECT * FROM products WHERE id = $1", [id]),
  findItemByProductsIds: (productIdsString) =>
    pool.query(`SELECT * FROM products WHERE id IN (${productIdsString})`),
  deleteItemById: (id) =>
    pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]),
};

module.exports = Product;
