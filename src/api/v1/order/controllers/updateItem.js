const orderService = require("../../../../lib/order");
const { getTransfromSingleData } = require("../../../../utils/responseData");
const { generateBadRequestError } = require("../../../../utils/error");

const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    // update user
    const updatedOrder = await orderService.updateItem({ data: body, id });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedOrder,
      selection: [
        "id",
        "customer",
        "items",
        "status",
        "orderinfo",
        "totalprice",
        "paymentstatus",
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

const updateItemStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validate status field
  if (
    !["pending", "processing", "shipped", "delivered", "cancelled"].includes(
      status
    )
  ) {
    const error = generateBadRequestError({
      properties: { status },
      msg: "Status is invalid!",
    });
    return next(error);
  }

  try {
    // update user
    const updatedOrder = await orderService.updateOrderStatus({ status, id });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: updatedOrder,
      selection: [
        "id",
        "customer",
        "items",
        "status",
        "orderinfo",
        "totalprice",
        "paymentstatus",
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

module.exports = { updateItem, updateItemStatus };
