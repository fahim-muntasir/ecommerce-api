const orderService = require("../../../../lib/order");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const deleteItem = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await orderService.deleteItem(id);

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: deletedOrder,
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
      data
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteItem;
