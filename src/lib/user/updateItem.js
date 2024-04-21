const {User} = require("../../models");
const { pool } = require("../../db/dbConnection");

const updateItem = async ({ data = {}, id }) => {
  try {
    // Extract data from the input object
    const { name, email } = data;

    // Construct the SQL UPDATE query
    const query = {
      text: 'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE id = $3 RETURNING *',
      values: [name, email, id]
    };

    // Execute the query
    const result = await pool.query(query);

    if (result.rowCount === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
module.exports = updateItem;