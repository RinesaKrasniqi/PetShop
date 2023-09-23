const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const stripe = Stripe(process.env.STRIPE_KEY);
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL, // Allow requests only from your frontend URL
}));
app.use(express.json());

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.json({ url: session.url });
});

module.exports = router;
