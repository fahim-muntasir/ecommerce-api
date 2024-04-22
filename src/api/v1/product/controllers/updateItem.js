const productService = require("../../../../lib/product");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const updateItem = async (req, res, next) => {
  const {id} = req.params;
  const body = req.body;

  try {
    // update user
    const updatedProduct = await productService.updateItem({data: body, id});

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedProduct,
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
      }
    }

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = updateItem;