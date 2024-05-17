const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const productService = require("../../../../lib/product");
const orderService = require("../../../../lib/order");
const cartService = require("../../../../lib/cart");

const checkout = async (req, res) => {
  const { items: orderedProductItems, orderInfo: shippingDetails } = req.body;
  const productsId = orderedProductItems.map((product) => product.product);

  const getDiscount = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const getQuantity = (id) =>
    orderedProductItems.find((item) => item.product === id)?.quantity;

  try {
    const products = await productService.findItemsByItemsIds(productsId);

    const line_items = [];

    products.forEach((product) => {
      const qt = getQuantity(product.id);
      line_items.push({
        quantity: qt,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.title,
          },
          unit_amount:Math.round(
            getDiscount(Number(product.price), Number(product.discount)) * 100 
          ),
        },
      });
    });

    // create an order
    const order = await orderService.create({
      customer: req?.user.id,
      items: orderedProductItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: orderedProductItems.reduce((total, product) => {
        return total + product.price;
      }, 0),
      orderInfo: {
        area: shippingDetails.area,
        city: shippingDetails.city,
        name: shippingDetails.name,
        phone: shippingDetails.phone,
        address: shippingDetails.address,
      },
    });

    // delete cart all items of this user
    await cartService.deleteItemByUserId(req?.user.id);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_DOMAIN}/cart?success=true`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}/cart?canceled=true`,
      metadata: {
        orderId: order.id,
      },
    });

    res.status(200).json({ msg: "payment successfull", url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "payment error" });
  }
};

module.exports = checkout;
