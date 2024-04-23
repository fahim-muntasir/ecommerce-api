const { notFoundError } = require("../../utils/error");
const { Cart } = require("../../models");

const updateItem = async ({ data = {}, id }) => {
  try {
    // Extract data from the input object
    const { product, quantity } = data;

    // update cart
    const result = await Cart.updateItem({product, quantity, id})

    if (result.rowCount === 0) {
      throw notFoundError("Cart not found!");
    }

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = updateItem;
