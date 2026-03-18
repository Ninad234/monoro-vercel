import dotenv from "dotenv";
dotenv.config();

import Stripe from 'stripe';

// IMPORTANT: Add your Stripe secret key to your .env file as STRIPE_SECRET_KEY=your_stripe_secret_key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'inr' } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 