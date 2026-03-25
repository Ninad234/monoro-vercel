import React from "react";

const About = () => {
  return (
    <div className="w-full px-4 md:px-8 py-12 min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <p className="max-w-2xl text-lg text-gray-700 text-center mb-8">
        Welcome to Monoro Clothing Industries Ltd!<br /><br />
        We are passionate about bringing you the latest trends and timeless classics in fashion. Our mission is to make everyone look and feel amazing, regardless of style or budget. Since 2020, we have been committed to providing reliable, high-quality products and a seamless shopping experience.<br /><br />
        Our team works tirelessly to curate collections that cater to every mood, occasion, and personality. Thank you for choosing Monoro — your style, our passion!
      </p>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="bg-gray-100 rounded-lg p-6 shadow w-72 text-center">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600">To be the go-to destination for fashion lovers seeking quality, affordability, and style.</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 shadow w-72 text-center">
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <p className="text-gray-600">Integrity, customer satisfaction, and a relentless pursuit of excellence in everything we do.</p>
        </div>
      </div>
    </div>
  );
};

export default About; 