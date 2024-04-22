const { pool } = require("../../db/dbConnection");

const findAllItems = async ({
  userId,
  page = 1,
  limit = 10,
  sortBy = "createdat",
  sortType = "desc",
  searchQuery = "",
  status = "",
  paymentstatus = ""
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
          ROW_NUMBER() OVER (ORDER BY ${sortBy.toLowerCase()} ${sortType === 'desc' ? 'DESC' : 'ASC'}) AS row_num
        FROM orders p
        WHERE 1=1
    `;

    const queryParams = [];

    // Add conditions for search query, status, and payment status
    if (status) {
      query += `
        AND status = $${queryParams.length + 1}
      `;
      queryParams.push(status);
    }

    if (paymentstatus) {
      query += `
        AND paymentstatus = $${queryParams.length + 1}
      `;
      queryParams.push(paymentstatus);
    }

    // Add condition to filter by customer (userId)
    if (userId) {
      query += `
        AND customer = $${queryParams.length + 1}
      `;
      queryParams.push(userId);
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

module.exports = findAllItems;