import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';

const Orders = () => {
  const [authUser] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (authUser) {
      axios.get(`http://localhost:4001/orders/user/${authUser._id}`)
        .then(res => setOrders(res.data))
        .catch(() => setOrders([]));
    }
  }, [authUser]);

  return (
    <div className="w-full p-4 px-4 md:px-8 mt-24 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <ul className="space-y-6">
          {orders.map(order => (
            <li key={order._id} className="border rounded-lg p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Order ID: {order._id}</span>
                <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="mb-2">Status: <span className="font-semibold">{order.status}</span></div>
              <div className="mb-2">Total: <span className="font-bold">₹{order.total}</span></div>
              <div className="mb-2">Shipping: {order.shipping?.name}, {order.shipping?.address}</div>
              <div>
                <span className="font-semibold">Items:</span>
                <ul className="ml-4 mt-2 list-disc">
                  {order.items.map(item => (
                    <li key={item.product._id} className="mb-1">
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