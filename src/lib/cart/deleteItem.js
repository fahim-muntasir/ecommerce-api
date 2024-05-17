const { Cart } = require("../../models");
const { notFoundError } = require("../../utils/error");

const deleteItem = async (id) => {
  try {
    const result = await Cart.deleteItemById(id);

    if (result.rowCount === 0) {
      throw notFoundError("Cart not found!");
    }

    // Return the deleted user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteItemByUserId = async (id) => {
  try {
    const result = await Cart.deleteItemByUserId(id);

    if (result.rowCount === 0) {
      throw notFoundError("Cart not found!");
    }

    // Return the deleted user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {deleteItem, deleteItemByUserId};