import React from "react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 md:px-8 mt-10 bg-gray-100 dark:bg-slate-900 text-black dark:text-white transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <div className="flex flex-col mb-6 md:mb-0">
          <h1 className="text-black dark:text-white text-3xl font-bold mb-2">Monoro</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Monoro Clothing Industries Ltd.</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Providing reliable products since 2020</p>
        </div>
        <div className="mt-6 md:mt-0">
          <h6 className="font-semibold mb-2">Company</h6>
          <div className="flex flex-col md:flex-col gap-2">
            <a href="/" className="hover:underline text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Home</a>
            <a href="/collection" className="hover:underline text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Collection</a>
            <a href="/about" className="hover:underline text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">About us</a>
            <a href="/contact" className="hover:underline text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">Contact</a>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <h6 className="font-semibold mb-2">Get in Touch</h6>
          <div className="text-sm text-gray-600 dark:text-gray-400">+1 555-770-7727<br />monoro@gmail.com</div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
        Copyright © {new Date().getFullYear()} - All rights reserved by Monoro Industries Ltd
      </div>
    </footer>
  );
};

export default Footer;
