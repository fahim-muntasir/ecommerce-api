const cartService = require("../../../../lib/cart");
const { getTransfromSingleData } = require("../../../../utils/responseData");
const { generateBadRequestError } = require("../../../../utils/error");
const productService = require("../../../../lib/product");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  if (!body?.product || !body?.quantity) {
    const error = generateBadRequestError({
      properties: { product: body?.product, quantity: body?.quantity },
    });
    return next(error);
  }

  try {
    // Check if the productId exists
    const isExistProduct = await productService.existProduct(body?.product);

    if (!isExistProduct) {
      const error = generateBadRequestError({
        msg: "Product id isn't valid!"
      });
      next(error);
    }

    // update user
    const updatedCart = await cartService.updateItem({ data: body, id });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedCart,
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
        self: req.originalUrl,
      },
    };

    // send final response
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = updateItem;
