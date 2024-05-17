const { pool } = require("../../db/dbConnection");
const { Product } = require("../../models");

const findAllItems = async ({
  page = 1,
  limit = 10,
  sortBy = "createdat",
  sortType = "desc",
  searchQuery = "",
  status = "",
}) => {
  try {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Construct the SQL query
    let query = `
      SELECT *
      FROM (
        SELECT
          p.*,
          COUNT(*) OVER() AS total_count,
          ROW_NUMBER() OVER (ORDER BY ${sortBy} ${sortType === 'desc' ? 'DESC' : 'ASC'}) AS row_num
        FROM products p
        WHERE 1=1
    `;

    const queryParams = [];

    // Add conditions for search query and status
    if (searchQuery) {
      query += `
        AND (title ILIKE $1 OR description ILIKE $1)
      `;
      queryParams.push(`%${searchQuery}%`);
    }
    if (status) {
      query += `
        AND status = $${queryParams.length + 1}
      `;
      queryParams.push(status);
    }

    // Close the subquery
    query += `
      ) AS subquery
      WHERE row_num > $${queryParams.length + 1}
      LIMIT $${queryParams.length + 2}
    `;
    queryParams.push(offset, limit);

    // Execute the SQL query
    const { rows } = await pool.query(query, queryParams);

    // Extract total count from the first row of the result set
    const totalItems = rows.length > 0 ? parseInt(rows[0].total_count) : 0;

    return { data: rows, totalItems };
  } catch (error) {
    throw error;
  }
};

const findItemsByItemsIds = async (ids) => {
  const productIdsString = ids.map(id => `'${id}'`).join(',');

  try {
    const products = await Product.findItemByProductsIds(productIdsString);

    return products.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {findAllItems, findItemsByItemsIds};