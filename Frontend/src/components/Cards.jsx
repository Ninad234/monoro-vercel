import React from "react";

const Cards = ({ item, onAddToCart, cardClassName = "w-full" }) => {
  return (
    <div className={`${cardClassName} hover:scale-105 duration-300`}>
      <div className="card w-full shadow-sm group mt-4 sm:mt-6 md:mt-8 relative overflow-hidden rounded-lg">
      <figure className="overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </figure>
        <div className="p-4">
          <h2 className="font-bold text-lg">{item.name}</h2>
          <p className="text-gray-600">{item.description}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.round(item.rating) ? "text-green-500" : "text-gray-400"}>★</span>
            ))}
            <span className="ml-2 text-sm text-gray-500">({item.rating})</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold text-xl">₹{item.price}</span>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onAddToCart && onAddToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;