import React from "react";
import Home from "./Home/Home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Collections from "./Collections/Collections";
import Signup from "./components/Signup";
import toast,{ Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import About from "./components/About";
import Contact from "./components/Contact";


const App = () => {
  const [authUser, setAuthUser] = useAuth();

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!authUser) {
      return <Navigate to="/signup" replace />;
    }
    return children;
  };

  return (
    <CartProvider className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/collection" 
          element={
            <ProtectedRoute>
              <Collections />
            </ProtectedRoute>
          } 
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false}/>
    </CartProvider>
  );
};

export default App;
