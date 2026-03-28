import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../config/api';
import { useAuth } from '../context/AuthProvider';
import { AuthContext } from '../context/AuthProvider';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// IMPORTANT: Add your Stripe publishable key to .env.local as VITE_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
   const stripe = useStripe();
  const elements = useElements();

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const cardOptions = {
    style: {
      base: {
        color: isDarkMode ? '#FFF' : '#000',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: isDarkMode ? '#e2e8f0' : '#000',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  };
  const { cart, clearCart } = useCart();
  const [authUser, setAuthUser] = useAuth();
  const [shipping, setShipping] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // temporary checking code 
//   useEffect(() => {
//   if (authUser) {
//     console.log("Checking AuthUser Structure:", authUser);
    
//     // Try different possible paths
//     const finalName = authUser.name || authUser.user?.name || authUser.fullName || "Name Not Found";
    
//     console.log("Extracted Name:", finalName);

//     if (finalName !== "Name Not Found") {
//       setShipping(prev => ({ ...prev, name: finalName }));
//     }
//   }
// }, [authUser]);

  useEffect(() => {
    if (authUser && authUser.fullname) {
      setShipping(prev => ({ ...prev, name: authUser.fullname, address: authUser.address || prev.address }));
    }
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Create payment intent
      const res = await API.post('/payment/create-payment-intent', {
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

        try {
        // Update Address according to the last one pic for payment 
        await API.put(`/users/update-profile/${authUser._id}`,{
          address:shipping.address
        })
        const updateUser = {...authUser,address:shipping.address};
        localStorage.setItem("Users", JSON.stringify(updateUser));
        setAuthUser(updateUser)

        } catch (error) {
          console.log("Address save nhi hua");
        }
        
        // Create order in backend
        await API.post('/orders', {
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
    } catch (error) {
      setError('Payment failed.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 px-4 md:px-8 bg-white dark:bg-slate-800 rounded shadow mt-24 transition-colors duration-300 border dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Checkout</h2>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-black dark:text-white">Name</label>
        <input 
          type="text" 
          className="input input-bordered w-full bg-white dark:bg-slate-700 text-black dark:text-white border-gray-300 dark:border-slate-600 focus:outline-none" 
          value={shipping.name} 
          onChange={e => setShipping({ ...shipping, name: e.target.value })} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-black dark:text-white">Address</label>
        <input 
          type="text" 
          className="input input-bordered w-full bg-white dark:bg-slate-700 text-black dark:text-white border-gray-300 dark:border-slate-600 focus:outline-none" 
          value={shipping.address} 
          onChange={e => setShipping({ ...shipping, address: e.target.value })} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-black dark:text-white">Card Details</label>
        <div className="w-full p-3 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900">
          <CardElement key={theme} options={cardOptions}/>
        </div>
      </div>
      <div className="mb-4 text-lg font-bold dark:text-white">Total: ₹{total}</div>
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
