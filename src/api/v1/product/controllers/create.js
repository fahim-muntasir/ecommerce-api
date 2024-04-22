const { generateBadRequestError } = require("../../../../utils/error");
const productService = require("../../../../lib/product");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const create = async (req, res, next) => {
  try {
    const { title, avatar, status, price, description, category, tags } =
      req.body;


    if (!title || !price || !description || !category) {
      const error = generateBadRequestError({
        properties: { title, price, description, category },
      });
      return next(error);
    }

    // Validate status field
    if (!["active"].includes(status)) {
      const error = generateBadRequestError({
        properties: { status },
        msg: "Status is invalid!"
      });
      return next(error);
    }

    // Insert Product into the database
    const newProduct = await productService.create({
      title,
      avatar,
      status,
      price,
      description,
      category,
      tags,
    });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: newProduct,
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
      code: 201,
      data,
      links: {
        self: `/products/${newProduct.id}`,
      },
    };

    // final response
    res.status(201).json(response);
  } catch (err) {
    if (err.code === "23505") {
      const error = generateBadRequestError({
        msg: "Email address is already in use",
      });
      return next(error);
    }
    console.log(err);
    next(err);
  }
};

module.exports = create;
