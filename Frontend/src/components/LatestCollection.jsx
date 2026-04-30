import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API from "../config/api";
import Slider from "react-slick";
import Cards from "./Cards";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { easeOut, motion } from "motion/react";

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [authUser] = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await API.get("/product");
        const data2 = res.data.filter(
          (item) => item.subCategory === "toprated"
        );
        console.log(data2);
        setProducts(data2);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const filteredProducts = products.filter(
    (item) => item?.subCategory && item?.subCategory.toLowerCase() === "toprated"
  );

  const handleAddToCart = (item) => {
    if (!authUser) {
      toast.error("Please log in to add products to cart!", { icon: "🔒" });
      return;
    }
    addToCart(item);
    toast.success("Your product has been added to cart!");
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="w-full px-4 md:px-8 py-4 mb-12 bg-white dark:bg-slate-900 transition-colors duration-300">
        <marquee behavior="scroll" direction="right" className="text-black dark:text-white text-xl font-bold">
          Flash Sale: Flat 50% Off for next 2 Hours! | Free Delivery on orders above ₹999 | Use Code: FLASH50
        </marquee>
        <div className="mb-5 pt-6">
          {/* <h1 className="text-black dark:text-white text-2xl mb-4 font-bold pt-5">
            Featured Categories
          </h1> */}
          {/* <div className="overflow-hidden bg-gray-100 p-4">
          <div className="inline-block animate-marquee text-black dark:text-white text-2xl font-bold">
            NEW Collections
          </div>
        </div> */}
        {/* Adding new afterwards not now  */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-4">
            <img
              className="mask mask-squircle object-cover object-top w-full h-96"
              src="https://images.unsplash.com/photo-1621347310166-7c2fb289e1fc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <img
              //https://images.unsplash.com/photo-1635631414456-6a9dc5051a3d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
              //https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop
              className="mask mask-squircle object-cover object-top w-full h-96"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&auto=format"
            />
            <img
              className="mask mask-squircle object-cover object-top w-full h-96"
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&auto=format"
            />
            <img
              className="mask mask-squircle object-cover object-top w-full h-96"
              src="https://plus.unsplash.com/premium_photo-1691367782367-2bd37f646abc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div> */}
          {/* <p className="text-black dark:text-white text-xl space-y-2">
            Upgrade your wardrobe without breaking the bank!
            <br />
            <b>Hurry!</b> Limited-time offer. <b>Enjoy Flat 28% OFF </b>on our
            Free Collection!
          </p> */}
        </div>
        <div className="latestCollection flex flex-col gap-2 justify-center items-center">
          <motion.div className="flex flex-row gap-2 justify-center items-center"
          initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, ease:easeOut}}>
          <h1 className="text-4xl font-sans text-gray-500">LATEST</h1>
          <h1 className="text-4xl font-sans text-black">COLLECTION</h1>
          <p className="w-12 h-[2.8px] bg-black items-center"></p>
          </motion.div>
          <motion.div
          initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:1.2, ease:easeOut}}>
          <p>Fresh drops. Bold vibes. Step into the season with styles that speak for you.</p>
          </motion.div>
        </div>
        <motion.div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2"
        initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:0.7, ease:'circOut', animationDelay:0.4}}>
          {/* <Slider {...settings}> */}
            {filteredProducts.map((item) => (
              <div key={item.id || item._id} className="px-3">
                <Cards item={item} onAddToCart={handleAddToCart} />
              </div>
            ))}
          {/* </Slider> */}
        </motion.div>
      </div>
    </>
  );
};

export default LatestCollection;
