import React from "react";
import heroImg from "../assets/hero_img.png";

const Banner = () => {
  return (
    <div className="w-full px-4 md:px-8">
      <div className="border flex flex-col md:flex-row h-[600px]">
        <div className="w-full md:w-1/2 flex items-center justify-center order-2">
          <div className="text-center md:text-left space-y-6 px-4 md:px-8">
            <p className="text-xl font-medium md:text-2xl">FRESH DROPS ✨</p>
            <h1 className="text-2xl playfair-display md:text-5xl leading-relaxed">
              Style For Everyone
            </h1>
            <div>
              <button className="px-4 py-4 text-xl font-medium md:text-2xl bg-black text-white rounded-md cursor-pointer hover:bg-gray-900 active:bg-gray-600">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <img
            src={heroImg}
            className="h-[300px] sm:h-[400px] md:h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
