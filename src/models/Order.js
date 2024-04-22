const { pool } = require("../db/dbConnection");

const Order = {
  create: ({ customer, items, totalPrice, orderInfo, status, paymentStatus }) =>
    pool.query(
      "INSERT INTO orders (customer, items, totalPrice, orderInfo, status, paymentStatus) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [customer, items, totalPrice, orderInfo, status, paymentStatus]
    ),
  findItemById: (id) =>
    pool.query("SELECT * FROM orders WHERE id = $1", [id]),
  deleteItemById: (id) =>
    pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]),
};

module.exports = Order;
