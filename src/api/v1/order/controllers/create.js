const { generateBadRequestError } = require("../../../../utils/error");
const orderService = require("../../../../lib/order");
const { getTransfromSingleData } = require("../../../../utils/responseData");

const create = async (req, res, next) => {
  try {
    const { items: orderItems, orderInfo } = req.body;

    if (
      Object.keys(orderItems).length === 0 ||
      Object.keys(orderInfo).length === 0
    ) {
      const error = generateBadRequestError({
        properties: { items: orderItems, orderInfo },
      });
      return next(error);
    }

    if (
      !orderInfo?.name ||
      !orderInfo?.phone ||
      !orderInfo?.city ||
      !orderInfo?.area ||
      !orderInfo?.address
    ) {
      const error = generateBadRequestError({
        properties: {
          name: orderInfo?.name,
          phone: orderInfo?.phone,
          city: orderInfo?.city,
          area: orderInfo?.area,
          address: orderInfo?.address,
        },
        msg: "All field is required!",
      });
      return next(error);
    }

    const items = orderItems.map((item) => {
      return {
        product: item?.product,
        quantity: item?.quantity,
        price: item?.price,
      };
    });

    // Calculate total price
    const total = orderItems.reduce((total, item) => total + item.price, 0);

    // Insert Product into the database
    const newOrder = await orderService.create({
      customer: req?.user.id,
      items,
      totalPrice: total,
      orderInfo,
      status: "pending",
      paymentStatus: "pending"
    });

    // generate the atuale data for the response
    const data = getTransfromSingleData({
      item: newOrder,
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
      code: 201,
      data,
      links: {
        self: `/orders/${newOrder.id}`,
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
