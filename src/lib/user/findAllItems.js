const { Profile } = require("../../models");

const findAllItems = async ({
  page = 1,
  limit = 10,
  sortBy = "createdat",
  sortType = "desc",
}) => {
  try {
    const offset = (page - 1) * limit;
    const sortOrder = sortType === "desc" ? "DESC" : "ASC";

    // Execute the query with parameters
    const { rows } = await Profile.find({ sortBy, sortOrder, limit, offset });

    // Fetch total count of items
    const { rows: countRows } = await Profile.findAllItems();
    const totalItems = parseInt(countRows[0].count);

    return { data: rows, totalItems };
  } catch (error) {
    throw error;
  }
};
module.exports = findAllItems;
