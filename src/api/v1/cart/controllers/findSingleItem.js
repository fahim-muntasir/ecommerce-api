const cartService = require("../../../../lib/cart");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    // find user by id
    const cart = await cartService.findSingleItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: cart,
      selection: [
        "id",
        "customer",
        "product",
        "quantity",
        "updatedat",
        "createdat",
      ],
    });

    const response = {
      code: 200,
      data,
      links: {
        self: req.originalUrl
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = findSingleItem;
