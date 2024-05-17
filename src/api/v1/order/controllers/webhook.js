const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderService = require("../../../../lib/order");

const webhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.ENDPOINT_SECRET
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log(paymentIntentSucceeded);
      break;
    case "checkout.session.completed":
      const { metadata } = event.data.object;
      await orderService.updatePaymentStatus({
        paymentStatus: "paid",
        id: metadata?.orderId,
      });

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
};

module.exports = webhook;
