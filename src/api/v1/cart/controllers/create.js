const { generateBadRequestError } = require("../../../../utils/error");
const cartService = require("../../../../lib/cart");
const productService = require("../../../../lib/product");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const create = async (req, res, next) => {
  try {
    const { product, quantity } = req.body;
    const customer_id = req.user.id;

    if (!product || !quantity) {
      const error = generateBadRequestError({
        properties: { product, quantity },
      });
      return next(error);
    }

    // Check if the productId exists
    const isExistProduct = await productService.existProduct(product);

    if (!isExistProduct) {
      const error = generateBadRequestError({
        msg: "Product id isn't valid!",
      });
      next(error);
    }

    const isExistUserAndProductCart = await cartService.isExistUserCart({
      customerId: customer_id,
      productId: product,
    });

    let newCartItem;

    if (!isExistUserAndProductCart) {
      // Insert Product into the database
      newCartItem = await cartService.create({
        customer: customer_id,
        product,
        quantity,
      });
    }else{
      newCartItem = await cartService.updateQuantity({
        product: isExistUserAndProductCart?.product,
        id: isExistUserAndProductCart?.id,
        quantity: isExistUserAndProductCart?.quantity + quantity,
      });
    }

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: newCartItem,
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
      code: 201,
      data,
      links: {
        self: `/carts/${newCartItem.id}`,
      },
    };

    // final response
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = create;
