const { pool } = require("../../db/dbConnection");
const { notFoundError } = require("../../utils/error");

const updateItem = async ({ data = {}, id }) => {
  try {
    // Extract data from the input object
    const { items, totalPrice, orderInfo, status, paymentStatus } = data;

    // Construct the SQL UPDATE query
    const query = {
      text: `
        UPDATE orders 
        SET 
          items = COALESCE($1, items), 
          totalPrice = COALESCE($2, totalPrice), 
          orderInfo = COALESCE($3, orderInfo), 
          status = COALESCE($4, status), 
          paymentStatus = COALESCE($5, paymentStatus) 
        WHERE id = $6 
        RETURNING *
      `,
      values: [
        JSON.stringify(items),
        totalPrice,
        JSON.stringify(orderInfo),
        status,
        paymentStatus,
        id,
      ],
    };

    // Execute the query
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw notFoundError("Order not found!");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = updateItem;
