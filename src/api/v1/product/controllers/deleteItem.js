const productService = require("../../../../lib/product");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productService.deleteItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: deletedProduct,
      selection: [
        "id",
        "title",
        "avatar",
        "status",
        "price",
        "description",
        "category",
        "tags",
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
