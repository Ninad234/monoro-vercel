import React from 'react';
import { useCart } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateCartItem, removeCartItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    updateCartItem(productId, quantity);
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="w-full p-4 px-4 md:px-8 mt-5 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map(item => (
              <li key={item.product._id} className="flex items-center py-4">
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg dark:text-white">{item.product.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 numbers">₹{item.product.price}</p>
                  <div className="flex items-center mt-2">
                    <button className="px-2 py-1 border rounded dark:border-slate-600 dark:text-white" onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
                    <span className="mx-2 dark:text-white text-normal numbers">{item.quantity}</span>
                    <button className="px-2 py-1 border rounded dark:border-slate-600 dark:text-white" onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="ml-4 text-red-500" onClick={() => removeCartItem(item.product._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-8 pt-8 border-t dark:border-slate-700">
            <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
            <div className="text-xl font-bold dark:text-white numbers">Total: ₹{total}</div>
            <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 