import React, { useEffect, useState } from 'react'
import API from '../config/api'
import { useCart } from '../context/CartProvider';
import { useAuth } from '../context/AuthProvider';
import Cards from './Cards';
import {circOut, easeOut, motion} from 'motion/react';
import toast from 'react-hot-toast';


const BestSeller = () => {
  const [product, setProduct] = useState([]);
  const [authUser] = useAuth();
  const {addToCart} = useCart();

  useEffect(() => {
   const fetchproducts = async() =>{
    try {
      const res = await API.get('/product')
      const data = res.data.filter(
        (item) => item?.subCategory?.toLowerCase() === "hotpicks"
      )
      setProduct(data)
      
    } catch (error) {
      console.error("Some error has been occured", error);
    }
   }
   fetchproducts()
  }, [])

  const handleAddToCart = (item) =>{
    if (!authUser) {
      toast.error("Please login to add this to cart");
    }
    addToCart(item)
    toast.success("The product has been added to the cart")
  }
  
  return (
    <>
    <div className='flex flex-col items-center justify-center text-center text-black gap-2'>
    <motion.div className='flex flex-row items-center gap-2 justify-center text-center tracking-widest'
    initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:0.8, ease:easeOut, animationDelay:0.4}}>
      <h1 className='text-4xl font-sans text-gray-500'>BEST</h1>
      <h1 className='text-4xl font-sans text-black'>SELLERS</h1>
       <p className='w-12 h-[2.5px] bg-black'></p>
    </motion.div>
    <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:1.2, ease:easeOut}}>
    <p className='mt-2 text-black dark:text-white'>Explore our handpicked collection of top-rated products. 
    Crafted with care and loved  by thousands of happy customers.</p>
    </motion.div>
    </div>
    <motion.div className='grid grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 px-6 mt-2'
    initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:0.8, ease:"circOut"}}>
    {product?.map((item)=>(
    <div key={item.id || item._id} className='px-3'>
      <Cards item={item} onAddToCart={handleAddToCart}/> 
    </div>
    ))}
    </motion.div>
    </>
  )
}

export default BestSeller