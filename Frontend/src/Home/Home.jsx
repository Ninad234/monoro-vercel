import React from 'react'
import Banner from '../components/Banner'
import LatestCollection from '../components/LatestCollection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <div className="w-full px-4 md:px-8">
      <Banner />
      <LatestCollection/>
    </div>
    </>
  );
};

export default Home;