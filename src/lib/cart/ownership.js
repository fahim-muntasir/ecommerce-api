const { Cart } = require("../../models");
const { notFoundError } = require("../../utils/error");

const ownership = async ({ resourceId = "", userId = "" }) => {
  try {
    const cart = await Cart.findItemById(resourceId);

    if (!cart) {
      throw notFoundError();
    }

    if (cart.rows[0]?.customer === userId) {

      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = ownership;