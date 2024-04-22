const { Order } = require("../../models");

const create = async ({
  customer = "",
  items = [],
  totalPrice = 0,
  orderInfo = {},
  status = "pending",
  paymentStatus = "pending"
}) => {
  try {
    const product = await Order.create({
      customer,
      items: JSON.stringify(items),
      totalPrice,
      orderInfo: JSON.stringify(orderInfo),
      status,
      paymentStatus
    });

    return product.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = create;