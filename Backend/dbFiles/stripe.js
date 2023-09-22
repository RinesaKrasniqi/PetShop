const express = require('express');
const Stripe = require('stripe');
const app = express();

require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
   //const userId = req.body.client_id;
try{
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
        cancel_url: `${process.env.CLIENT_URL}/user-fish`,
    });

    res.json({ url: session.url });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
}
});

module.exports = router;
