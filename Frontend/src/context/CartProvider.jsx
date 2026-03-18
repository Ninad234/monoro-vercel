import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [authUser] = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (authUser) {
      axios.get(`http://localhost:4001/cart/${authUser._id}`)
        .then(res => setCart(res.data.items || []))
        .catch(() => setCart([]));
    } else {
      setCart([]);
    }
  }, [authUser]);

  const addToCart = async (product, quantity = 1) => {
    if (!authUser) return;
    await axios.post(`http://localhost:4001/cart/${authUser._id}`, { productId: product._id, quantity });
    // Refresh cart
    const res = await axios.get(`http://localhost:4001/cart/${authUser._id}`);
    setCart(res.data.items || []);
  };

  const updateCartItem = async (productId, quantity) => {
    if (!authUser) return;
    await axios.put(`http://localhost:4001/cart/${authUser._id}`, { productId, quantity });
    const res = await axios.get(`http://localhost:4001/cart/${authUser._id}`);
    setCart(res.data.items || []);
  };

  const removeCartItem = async (productId) => {
    if (!authUser) return;
    await axios.delete(`http://localhost:4001/cart/${authUser._id}`, { data: { productId } });
    const res = await axios.get(`http://localhost:4001/cart/${authUser._id}`);
    setCart(res.data.items || []);
  };

  const clearCart = async () => {
    if (!authUser) return;
    await axios.delete(`http://localhost:4001/cart/${authUser._id}/clear`);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 