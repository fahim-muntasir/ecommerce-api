const productService = require("../../../../lib/product");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const findSingleItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    // find user by id
    const product = await productService.findSingleItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: product,
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
      data,
      links: {
        self: req.originalUrl
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = findSingleItem;
