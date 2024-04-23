const { Cart } = require("../../models");
const { notFoundError } = require("../../utils/error");

const findSingleItem = async (id) => {
  try {
    const result = await Cart.findItemById(id);

    // Check if the user was found
    if (result.rows.length === 0) {
      throw notFoundError("Cart not found!");
    }

    // Return the user object
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const existCart = async (id) => {
  try {
    const product = await Cart.findItemById(id);

    if (product.rows.length !== 0) {
      return product.rows[0];
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = { findSingleItem, existCart };
