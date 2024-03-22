require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = express.Router();
const sql=require('mssql');

var config={
  user:"Margita",
  password: "123",
  server: "MARGITA1083\\MSSQLSERVER01",
  database : "ProjektiLAB1",
  driver: "msnodesqlv8",
  options:{
      trustedConnection:true
  }
};


const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Configure CORS optionsa
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

router.use(cors(corsOptions));

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { cartItems } = req.body;
    const successUrl= `http://localhost:5000/stripe/purchaseProduct/${cartItems[0].Client_id}`;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.Name,
          metadata: {
            Client_id: item.Client_id,
          },
        },
        unit_amount: item.Price * 100,
      },
      quantity: item.quantity,
    }));

    console.log('Line Items:', lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: 'http://localhost:3000/user-cart', 
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
router.get('/purchaseProduct/:Client_id', async (req, res) => {
  try {
    const { Client_id } = req.params;
    console.log('Received Client_id:', Client_id);
    
    // Update the cart status in the database
    const pool = await sql.connect(config);
    const Clientid = parseInt(Client_id, 10);
    const result = await pool.request()
      .input('Client_id', sql.Int, Clientid)
      .query(
        `UPDATE Cart
        SET status = 1
        WHERE Client_id = @Client_id`
      );

    // Redirect to the user-purchased page or send a success response
    res.redirect(302, 'http://localhost:3000/user-purchased');
  } catch (error) {
    console.error('Error handling success:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;



