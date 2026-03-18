import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Slider from "react-slick";
import Cards from "./Cards";
import { useCart } from '../context/CartProvider';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [authUser] = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4001/product")
        const data2 = res.data.filter((item)=> item.category === "Flat 28% OFF")
        console.log(data2)
        setProducts(data2)
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    item => item.category && item.category.toLowerCase() === 'flat 28% off'
  );

  const handleAddToCart = (item) => {
    if (!authUser) {
      toast.error('Please log in to add products to cart!', { icon: '🔒' });
      return;
    }
    addToCart(item);
    toast.success('Your product has been added to cart!');
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className="w-full px-4 md:px-8 py-4 mb-12">
        <div className="mb-5">
          <h1 className="text-black bg-white text-2xl mb-4 font-bold">Best Offers !!</h1>
          <p className="text-black bg-white text-xl space-y-2">
            Upgrade your wardrobe without breaking the bank!
            <br />
            <b>Hurry!</b> Limited-time offer. <b>Enjoy Flat 28% OFF </b>on our Free Collection!
          </p>
        </div>
        <div>
          <Slider {...settings}>
        {filteredProducts.map((item)=> (
          <div key={item.id || item._id} className="px-3"> 
             <Cards item={item} onAddToCart={handleAddToCart}/>
        </div>
        ))}
      </Slider>
        </div>
      </div>
    </>
  );
};

export default LatestCollection;