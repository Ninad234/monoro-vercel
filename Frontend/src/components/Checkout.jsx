import React, { useState } from 'react';
import { useCart } from '../context/CartProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// IMPORTANT: Add your Stripe publishable key here
const stripePromise = loadStripe('pk_test_51RnaodFxgc3U9OC38JBaxS75kI6tThUE4H4IyTIpLN0dh2DDclD0wK2KE6nBrhAS8Iu7xfzFTpbWeNImI3RIZZdb00Q19Qiiuu');

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const [authUser] = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [shipping, setShipping] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Create payment intent
      const res = await axios.post('http://localhost:4001/payment/create-payment-intent', {
        amount: Math.round(total * 100), // Stripe expects amount in paise
      });
      const clientSecret = res.data.clientSecret;
      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: shipping.name, address: { line1: shipping.address } },
        },
      });
      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setSuccess('Payment successful!');
        // Create order in backend
        await axios.post('http://localhost:4001/orders', {
          userId: authUser._id,
          items: cart.map(item => ({ product: item.product._id, quantity: item.quantity })),
          total,
          paymentId: result.paymentIntent.id,
          shipping,
        });
        clearCart();
        toast.success('Your order has been placed! See the Orders tab.');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      setError('Payment failed.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 px-4 md:px-8 bg-white rounded shadow mt-24">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Name</label>
        <input type="text" className="input input-bordered w-full" value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Address</label>
        <input type="text" className="input input-bordered w-full" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Card Details</label>
        <div className="border p-2 rounded">
          <CardElement />
        </div>
      </div>
      <div className="mb-4 text-lg font-bold">Total: ₹{total}</div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading || !stripe}>Pay Now</button>
    </form>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Checkout; 