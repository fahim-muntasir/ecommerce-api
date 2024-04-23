const cartService = require("../../../../lib/cart");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCart = await cartService.deleteItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: deletedCart,
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
      data
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteItem;
