require('dotenv').config();
const paypal = require('@paypal/checkout-server-sdk');

const environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);

// Dynamic function for creating an order
const CreateRequest = async (obj) => {
  const { amount, currency, items } = obj;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
        },
        items: items.map(item => ({
          name: item.name,
          unit_amount: { currency_code: currency, value: item.price },
          quantity: item.quantity,
        })),
      },
    ],
  });

  try {
    const order = await client.execute(request);
    return { id: order.result.id };  // Return the order ID
  } catch (err) {
    console.error('Error creating order:', err);
    throw new Error('Could not create order');
  }
};

// Dynamic function for capturing payment
const CaptureRequest = async (orderId) => {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    return { status: capture.result.status, details: capture.result };  // Return capture result
  } catch (err) {
    console.error('Error capturing order:', err);
    throw new Error('Could not capture order');
  }
};

module.exports = {
  CreateRequest,
  CaptureRequest,
};
