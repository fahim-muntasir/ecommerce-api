const { Product } = require("../../models");

const create = async ({
  title,
  avatar = "",
  status = "active",
  price,
  description,
  category,
  tags = [],
}) => {
  try {
    const product = await Product.create({
      title,
      avatar,
      status,
      price,
      description,
      category,
      tags,
    });

    return product.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = create;
