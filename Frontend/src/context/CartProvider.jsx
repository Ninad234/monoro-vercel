import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../config/api';
import { useAuth } from './AuthProvider';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [authUser] = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (authUser) {
      API.get(`/cart/${authUser._id}`)
        .then(res => setCart(res.data.items || []))
        .catch(() => setCart([]));
    } else {
      setCart([]);
    }
  }, [authUser]);

  const addToCart = async (product, quantity = 1) => {
    if (!authUser) return;
    await API.post(`/cart/${authUser._id}`, { productId: product._id, quantity });
    // Refresh cart
    const res = await API.get(`/cart/${authUser._id}`);
    setCart(res.data.items || []);
  };

  const updateCartItem = async (productId, quantity) => {
    if (!authUser) return;
    await API.put(`/cart/${authUser._id}`, { productId, quantity });
    const res = await API.get(`/cart/${authUser._id}`);
    setCart(res.data.items || []);
  };

  const removeCartItem = async (productId) => {
    if (!authUser) return;
    await API.delete(`/cart/${authUser._id}`, { data: { productId } });
    const res = await API.get(`/cart/${authUser._id}`);
    setCart(res.data.items || []);
  };

  const clearCart = async () => {
    if (!authUser) return;
    await API.delete(`/cart/${authUser._id}/clear`);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 
