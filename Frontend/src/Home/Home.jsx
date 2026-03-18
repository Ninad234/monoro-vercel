import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import LatestCollection from '../components/LatestCollection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <div className="w-full px-4 md:px-8">
      <Banner />
      <LatestCollection/>
      <Footer />
    </div>
    </>
  );
};

export default Home;