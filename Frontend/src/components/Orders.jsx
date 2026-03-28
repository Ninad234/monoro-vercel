import React, { useEffect, useState } from 'react';
import API from '../config/api';
import { useAuth } from '../context/AuthProvider';

const Orders = () => {
  const [authUser] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (authUser) {
      API.get(`/orders/user/${authUser._id}`)
        .then(res => setOrders(res.data))
        .catch(() => setOrders([]));
    }
  }, [authUser]);

  return (
    <div className="w-full p-4 px-4 md:px-8 mt-5 min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 dark:text-white">My Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <ul className="space-y-6">
          {orders.map(order => (
            <li key={order._id} className="border dark:border-slate-700 rounded-lg p-4 shadow bg-white dark:bg-slate-800 transition-colors duration-300">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold dark:text-white numbers">Order ID: {order._id}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400 numbers dark:text-white">{new Date(order.createdAt).toLocaleString('en-IN')}</span>
              </div>
              <div className="mb-2 dark:text-gray-300">Status: <span className="font-semibold dark:text-white">{order.status}</span></div>
              <div className="mb-2 dark:text-gray-300">Total: <span className="font-bold dark:text-white numbers">₹{order.total}</span></div>
              <div className="mb-2 dark:text-gray-300">Shipping: {order.shipping?.name}, {order.shipping?.address}</div>
              <div>
                <span className="font-semibold dark:text-white">Items:</span>
                <ul className="ml-4 mt-2 list-disc dark:text-gray-300">
                  {order.items.map(item => (
                    <li key={item.product._id} className="mb-1 numbers">
                      {item.product.name} x {item.quantity} (₹{item.product.price})
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders; 
