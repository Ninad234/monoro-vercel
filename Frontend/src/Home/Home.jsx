import React from 'react'
import Banner from '../components/Banner';
import LatestCollection from '../components/LatestCollection';
import Footer from '../components/Footer';
import BestSeller from '../components/BestSeller';
import Features from '../components/Features';
import Policy from '../components/Policy';

const Home = () => {
  return (
    <>
    <div className="w-full px-4 md:px-8">
      <Banner />
      <LatestCollection/>
      <BestSeller/>
      <Features/>
      <Policy/>
    </div>
    </>
  );
};

export default Home;