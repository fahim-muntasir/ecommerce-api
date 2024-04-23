const { Cart } = require("../../models");
const { notFoundError } = require("../../utils/error");

const ownership = async ({ resourceId = "", userId = "" }) => {
  try {
    const cart = await Cart.findById(resourceId);

    if (!cart) {
      throw notFoundError();
    }

    if (cart.rows?.customer === userId) {

      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

module.exports = ownership;