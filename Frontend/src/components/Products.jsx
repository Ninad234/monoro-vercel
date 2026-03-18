import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './Cards';
import { useCart } from '../context/CartProvider';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:4001/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map(product => (
        <Cards key={product._id} item={product} onAddToCart={handleAddToCart} />
      ))}
    </div>
  );
};

export default Products;
