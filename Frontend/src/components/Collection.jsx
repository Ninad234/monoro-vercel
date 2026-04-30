import { useEffect, useState } from "react";
import API from "../config/api";
import list from "../assets/list.json";
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
      const res = await API.get('/product') 
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
  
        {/* <div className="w-full py-4 px-4 md:px-8">
        <div className=" items-center justify-center text-center">
          <h1 className="text-2xl font-bold md:text-5xl dark:text-white">
            We're Delighted to have you here
            <span className="inline-block cursor-pointer transition-all duration-300 hover:scale-110 group">
              <span className="group-hover:hidden">🙂</span>
              <span className="hidden group-hover:inline">🤗</span>
            </span>
          </h1>
          <p className="mt-12 dark:text-gray-300">
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
      </div> */}
  
  return (
    <>
{/* <div className="drawer lg:drawer-open"> */}
  {/* <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    {/* Page content here */}
    {/* <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
      Open drawer
    </label>  */}
    {/* </div> */}
      <div className="products flex-1">
        <div className="w-full py-4 px-4 md:px-8">
        <div className=" text-center">
          <h1 className="text-2xl font-bold md:text-5xl dark:text-white">
            We're Delighted to have you here
            <span className="inline-block cursor-pointer transition-all duration-300 hover:scale-110 group">
              <span className="group-hover:hidden">🙂</span>
              <span className="hidden group-hover:inline">🤗</span>
            </span>
          </h1>
          <p className="mt-12 dark:text-gray-300">
            Fashion is more than just clothing - it's your personal expression,
            your confidence booster, and your story told without words. At our
            store, we believe everyone deserves to look and feel amazing,
            regardless of their style preference or budget. From timeless
            classics that never go out of style to the hottest trends straight
            from the runway, we bring you an extensive collection that caters to
            every mood, occasion, and personality.
          </p>
        </div>
        <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
           {/* // For db connection bro */}
            {products.map((item) => (
              <Cards key={item._id} item={item} onAddToCart={handleAddToCart} />
            ))}
            {/* {
              list.map((item) => (
                <Cards key={item.id} item={item} onAddToCart={handleAddToCart}/>
              ))
            } */}
        </div>
      </div>
      </div>
    
  {/* <div className="drawer-side sticky top-0">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menus pt-5 w-80 p-4 text-white dark:text-black bg-black dark:bg-slate-900 border-white dark:border-slate-700 border-2 overflow-y-auto">
      <span className="text-2xl font-bold text-white dark:text-black">Filters</span>
      <hr />
      {/* Sidebar content here */}
      {/* // <li><a>Sidebar Item 1</a></li>
      // <h1>Filters</h1>
      // <li><a>Sidebar Item 2</a></li>
  //   </ul> */}
  {/* // </div> */}
  {/* // </div> */}
</>
  );
};

export default Collection;
