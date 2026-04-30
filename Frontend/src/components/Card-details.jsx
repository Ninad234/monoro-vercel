import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
// import list from "../assets/list.json";
import { useCart } from "../context/CartProvider";
import { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import {motion} from 'motion/react';
import Cards from "./Cards";


const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {addToCart} = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  // const product = list.find((p) => p.id === Number(id));
  //  if(!product) {
  //         console.log("The product can't be find");
  //       }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error in fetching the products ",error);
      } finally{
        setLoading(false);
      }
    }
    if (id)fetchProduct();
  }, [id]);
  
  //Fo related products only 
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
        setAllProducts(res.data); 
      } catch (error) {
        console.error("Error in finding the product",error);
        
      }
    }
    fetchAllProducts();
  }, [])
  
  
  // if (loading) return <div className="text-center mt-10">Loading Product Details</div>
  // if(!product) return <div className="text-center mt-10">Product not Found!</div>
  
  const handleAddToCart = async () => {
    try {
      await addToCart(product);
      navigate('/cart');
    } catch (error) {
      console.error("Error adding to the cart",error);
    }
  }

  const currentProduct = product;

   if (loading || !product || !allProducts?.length) {
     return <div>Loading...</div>;
  }


  const relatedProducts = (allProducts || []).filter((p) => p.category?.toLowerCase() === currentProduct?.category?.toLowerCase() && (p.id || p._id?.$oid || p._id) !== (currentProduct.id ||currentProduct._id?.$oid || currentProduct._id))
  .sort(()=> 0.5 - Math.random());

  return (
    <>
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Images */}
      <div className="w-full md:w-auto h-[400px] md:h-[600px] rounded-lg overflow-hidden p-4 flex items-center justify-center">
        {product && <img src={product.image} className="w-full h-full object-contain"/>}
        {/* <img src={product.image} className="rounded-lg"/>
        <img src={product.image} className="rounded-lg"/>
        <img src={product.image} className="rounded-lg"/> */}
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-sans font-medium font">{product.name}</h1>

        <p className="text-md font-sans internumbers font-medium flex-row flex items-center pt-2 gap-2">
          <div className="flex flex-row">
            {[...Array(5)].map((_,i)=>(
              <span key={i} className={i < Math.round(product.rating) ? "text-orange-500" : "text-gray-500"}>
                {/* <CiStar /> */}
                <FaStar />
              </span>
            ))}
          </div>
          <span>({product.rating})</span>
          </p>

        <div className="text-2xl font-bold mt-4 numbers pt-2">
          ₹{product.price}
        </div>

        <p className="text-gray-500 mt-2 pt-2">
          {product.description}
        </p>


        <div className="flex gap-4 mt-6">
          <button className="btn bg-[#0F172B] text-white border-none active:bg-gray-600 active:text-black px-8"
          onClick={handleAddToCart}>
            Add to Cart
          </button>
{/* onAddToCart(product) */}
          {/* <button className="btn btn-warning">
            Buy Now
          </button> */}
        </div>
        <hr className="mt-8 border-t-2 mb-4"/>
        <div className="font-mono text-sm">
        <p>100% Original Product.</p>
        <p>Cash on Delivery is available on this product.</p>
        <p>Easy Return Exchange Policy for 7 Days.</p>
        </div>
      </div>
    </div>
    <motion.div className="flex flex-row gap-2 justify-center items-center"
                  initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, ease:"easeOut"}}>
                  <h1 className="text-4xl font-sans text-gray-500">RELATED</h1>
                  <h1 className="text-4xl font-sans text-black">PRODUCTS</h1>
                  <p className="w-12 h-[2.8px] bg-black items-center"></p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {relatedProducts.slice(0,4).map((p) => (
                      <Cards key={p.id ||p._id?.$oid || p._id} item={p} />
                    ))}
                  </div>
        
    </>
  );
};

export default ProductDetails;