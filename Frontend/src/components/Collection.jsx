import { useEffect, useState } from "react";
import axios from "axios";
// import list from "../assets/list.json";
import Cards from "../components/Cards";
import { useCart } from '../context/CartProvider';
import toast, {Toaster} from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Collection = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [authUser] = useAuth();
  useEffect(() => {
     const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4001/product") 
      console.log(res.data)
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    }
     };
    getProducts();
  }, [])


  const handleAddToCart = (item) => {
    if (!authUser) {
      toast.error('Please log in to add products to cart!', { icon: '🔒' });
      return;
    }
    addToCart(item);
    toast.success('Your product has been added to cart!');
  };
  
  
  return (
    <>
      <div className="w-full py-4 px-4 md:px-8">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl font-bold md:text-5xl">
            We're Delighted to have you here
            {/* <span className="inline-block hover:scale-110 hover:rotate-12 cursor-pointer transition-transform duration-300 ease-in-out">
              🤗
            </span> */}
            <span className="inline-block cursor-pointer transition-all duration-300 hover:scale-110 group">
              <span className="group-hover:hidden">🙂</span>
              <span className="hidden group-hover:inline">🤗</span>
            </span>
          </h1>
          <p className="mt-12">
            Fashion is more than just clothing - it's your personal expression,
            your confidence booster, and your story told without words. At our
            store, we believe everyone deserves to look and feel amazing,
            regardless of their style preference or budget. From timeless
            classics that never go out of style to the hottest trends straight
            from the runway, we bring you an extensive collection that caters to
            every mood, occasion, and personality.
          </p>
        </div>
        <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <Cards key={item._id} item={item} onAddToCart={handleAddToCart} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Collection;
