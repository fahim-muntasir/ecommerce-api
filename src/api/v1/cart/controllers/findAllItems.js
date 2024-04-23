const cartService = require("../../../../lib/cart");
const { transfromData } = require("../../../../utils/responseData");

const findAllItems = async (req, res, next) => {
  const sortType = req.query.sortType || "desc";
  const sortBy = req.query.sortBy || "createdat";

  try {
    const { data } = await cartService.findAllItems({ sortBy, sortType });
    console.log(data)
    // transfrom user data for response
    const carts = transfromData({
      items: data,
      selection: [
        "id",
        "customer",
        "product",
        "quantity",
        "updatedat",
        "createdat",
      ],
      path: req.baseUrl + req.path,
    });

    // final response
    const response = {
      code: 200,
      data: carts,
      links: {
        self: `/carts`,
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = findAllItems;
