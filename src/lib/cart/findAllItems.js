const { Cart } = require("../../models");

const findAllItems = async ({
  sortBy = "createdat",
  sortType = "desc",
}) => {
  try {
    const sortOrder = sortType === "desc" ? "DESC" : "ASC";

    // Execute the query with parameters
    const { rows } = await Cart.find({ sortBy, sortOrder });

    // Fetch total count of items
    const { rows: countRows } = await Cart.findAllItems();
    const totalItems = parseInt(countRows[0].count);

    return { data: rows, totalItems };
  } catch (error) {
    throw error;
  }
};
module.exports = findAllItems;
