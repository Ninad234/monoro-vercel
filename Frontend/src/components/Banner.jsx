import React, { useRef, useEffect } from "react";
import heroImg from "../assets/hero_img.webp";

const Banner = () => {
  const carouselRef = useRef(null);
  useEffect(() => {
    let currentSlide = 0;
    let totalSlides = 4;
    const interval = setInterval(() => {
    if (!carouselRef.current) return;
    currentSlide++;
  
    if (currentSlide >= totalSlides) {
      currentSlide = 0; // Wapas pehle slide par le aayega
    }

    const width = carouselRef.current.offsetWidth; 
      carouselRef.current.scrollTo({
        left: width * currentSlide,
        behavior: 'smooth'
      });
    }, 3000);
      return () => clearInterval(interval);
  }, []);
  
// const totalSlides = 4; // Jitne slides tune dale hain
// let currentSlide = 0;

// setInterval(() => {
//   currentSlide++;
  
//   if (currentSlide > totalSlides) {
//     currentSlide = 0; // Wapas pehle slide par le aayega
//   }

//   // Window location hash change karke scroll trigger karega
//   const scrollAmount = carousel.clientWidth * currentSlide;

//   // Scroll ONLY the carousel, not the whole page
//     carousel.scrollTo({
//       behavior: 'smooth', // Smooth animation ke liye
//       left:scrollAmount
//     });
// }, 3000); // 3000ms = 3 seconds
  return (
    <div className="w-full px-4 md:px-8 mt-8">
      <div className="border border-gray-200 dark:border-slate-700 flex flex-col md:flex-row h-full bg-white dark:bg-slate-800 transition-colors duration-300">
        {/* <div className="w-full  flex items-center justify-center order-2"> */}
          {/* <div className="text-center md:text-left space-y-6 px-4 md:px-8">
            <p className="text-xl font-medium md:text-2xl dark:text-gray-300">FRESH DROPS ✨</p>
            <h1 className="text-2xl playfair-display md:text-5xl leading-relaxed dark:text-white">
              Style For Everyone
            </h1>
            <div>
              <button className="px-4 py-4 text-xl font-medium md:text-2xl bg-black text-white rounded-md cursor-pointer hover:bg-gray-900 active:bg-gray-600">
                SHOP NOW
              </button>
            </div>
          </div> */}
        {/* </div> */}
        <div className="w-full  order-1 md:order-2">
          {/* <img
            src={heroImg}
            className="h-[300px] sm:h-[400px] md:h-full w-full object-cover"
          /> */}
          <div className="carousel w-full flex overflow-hidden" ref={carouselRef}>
  <div  className="carousel-item relative w-full h-[500px] md:h-[600px] overflow-hidden flex-shrink-0">
    <img
    //https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp
    // h-[300px] md:h-[500px] new h-[605px] md:h-[450px]
      src={heroImg}
      // w-full h-[300px] sm:h-[450px] md:h-[600px] object-cover object-center
     // max-h-[85%] max-w-full h-auto w-auto object-contain object-center scale-95 md:scale-100 transition duration-300
      className="w-full h-full" />
    <p className="absolute text-black top-32 left-24 dark:text-black -translate-y-1/2 z-10 font-bold text-5xl">Fresh Drops ✨</p>
    <h1 className="text-black absolute top-42 left-24 -translate-y-1/2 z-10 text-4xl font-medium mt-2"> Style For Everyone </h1>
    <button className="p-4 font-medium bg-black absolute top-48 left-24 text-white mt-4 rounded-md hover:bg-gray-600 active:bg-gray-900 cursor-pointer">SHOP NOW</button>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    </div>
  </div>
  <div  className="carousel-item relative w-full h-[500px] md:h-[600px] overflow-hidden flex-shrink-0">
    <img
      src="../public/man.jpg"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    </div>
  </div>
  <div className="carousel-item relative w-full h-[500px] md:h-[600px] overflow-hidden flex-shrink-0">
    <img
      src="../public/women.jpg"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    </div>
  </div>
  <div className="carousel-item relative w-full h-[500px] md:h-[600px] overflow-hidden flex-shrink-0">
    <img
      src="kids.jpg"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    </div>
  </div>
</div>        
        </div>
      </div>
    </div>
  );
};

export default Banner;
