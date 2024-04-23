const { Cart } = require("../../models");

const create = async ({
  customer,
  product,
  quantity
}) => {
  try {
    const cart = await Cart.create({
      customer,
      product,
      quantity
    });

    return cart.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = create;