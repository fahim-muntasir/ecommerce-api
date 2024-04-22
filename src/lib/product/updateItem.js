const { pool } = require("../../db/dbConnection");
const { notFoundError } = require("../../utils/error");

const updateItem = async ({ data = {}, id }) => {
  try {
    // Extract data from the input object
    const {
      title,
      avatar,
      price,
      description,
      category,
      tags,
    } = data;
  
    // Construct the SQL UPDATE query
    const query = {
      text: `
        UPDATE products 
        SET 
          title = COALESCE($1, title), 
          avatar = COALESCE($2, avatar),  
          price = COALESCE($3, price), 
          description = COALESCE($4, description), 
          category = COALESCE($5, category), 
          tags = COALESCE($6, tags) 
        WHERE id = $7 
        RETURNING *
      `,
      values: [title, avatar, price, description, category, tags, id]
    };

    // Execute the query
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      throw notFoundError("Product not found!");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = updateItem;
