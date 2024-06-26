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
      SELECT orders.*,
        (SELECT jsonb_build_object(
          'id', profile.id,
          'name', profile.name,
          'email', profile.email
        )
        FROM profile
        WHERE profile.id = orders.customer) AS customer,
        COUNT(*) OVER() AS total_count
      FROM orders
      WHERE 1=1
    `;

    const queryParams = [];

    // Add conditions for search query, status, and payment status
    if (searchQuery) {
      query += `
        AND (title ILIKE $${queryParams.length + 1} OR description ILIKE $${queryParams.length + 1})
      `;
      queryParams.push(`%${searchQuery}%`);
    }
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

    // Add sorting, pagination and close the main query
    query += `
      ORDER BY ${sortBy} ${sortType.toUpperCase()}
      OFFSET $${queryParams.length + 1}
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

module.exports = findAllItems
