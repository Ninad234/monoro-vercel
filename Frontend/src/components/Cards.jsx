import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

const Cards = ({ item, onAddToCart, cardClassName = "w-full" }) => {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true)
  if (!item) {
    return <div>Loading...</div>; 
  }

  //  useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const res = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
  //       console.log("API DATA:", res.data); 
  //       setProducts(res.data)
  //     } catch (error) {
  //       console.error("Some error has been occured bro",error);
  //     } finally{
  //       setLoading(false)
  //     }
  //   }
  //     fetchProduct()
  // }, [id])

  //  if (loading) {
  //   return <div className="text-center mt-10">Loading ...</div>;
  // }

  // if (!products || products.length === 0) {
  //   return <div className="text-center mt-10">No products found</div>;
  // }

  const handleAddToCart = async () =>{
    try {
      await onAddToCart(item)
      navigate('/cart')
    } catch (error) {
      console.error("Some error has been occured",error);
      
    }
  }
  
  return (
    <div className={`${cardClassName} mt-4 sm:mt-6 md:mt-8`}>
      <div className="card w-full group relative overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-xl h-full flex flex-col">
      <figure className="overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-56 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-105 duration-300 transition-all ease-in-out"
          />
        </figure>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="font-bold text-lg dark:text-white">{item.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 flex-grow text-sm line-clamp-2">{item.description}</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(item.rating) ? "text-green-500" : "text-gray-400"}>★</span>
            ))}
            {/* <span className="text-sm text-gray-500 dark:text-gray-400 numbers">({item.rating})</span> */}
          </div>
          <div className="flex flex-col flex-start justify-between items-start mt-auto">
            <span className="font-semibold text-xl dark:text-white numbers">₹{item.price}</span>
            <div className="flex flex-row gap-6 pt-4">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  // console.log(item);
                  // navigate(`/product/${item._id}`)
                   if (item._id || item.id) {
                         navigate(`/product/${item._id || item.id}`);
                      } else {
                        console.error("Product ID is missing");
                      }
                }
                }
              >
                View Details
              </button>
              <button
              className="btn btn-primary btn-sm"
              onClick={handleAddToCart}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;