const { User } = require("../../models");
const { notFoundError } = require("../../utils/error");

const deleteItem = async (id) => {
  try {
    const result = await User.deleteItemById(id);

    if (result.rowCount === 0) {
      throw notFoundError("User not found!");
    }

    // Return the deleted user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = deleteItem;