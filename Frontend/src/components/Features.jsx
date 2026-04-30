import React from 'react'
import { RiExchangeFundsLine } from "react-icons/ri";
import { MdHeadsetMic } from "react-icons/md";
import { GoShieldCheck } from "react-icons/go";
import { motion } from 'framer-motion';

const Features = () => {
  return (
    <div className='flex flex-row justify-around mt-12 gap-12 py-30'>
        <motion.div className='flex flex-col items-center text-center justify-center'
        initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, ease:"circOut"}}>
          <div className='w-12 m-auto mb-6 '>
             <RiExchangeFundsLine size={50}/>
          </div> 
            Easy Exchange Policy <br/>
We offer hassle free exchange policy.</motion.div>
        <motion.div className='flex flex-col items-center text-center justify-center' 
        initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, ease:"circOut"}}>
            <div className="w-12 m-auto m-6">
                <GoShieldCheck size={50}/>
            </div>
            Best Return Policy <br/>
We offer 7 Day Return Policy with no question asked.</motion.div>
        <motion.div className='flex flex-col items-center text-center justify-center'
        initial={{opacity:0, y:40}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, ease:"circOut"}}>
            <div className="w-12 m-auto mb-6">
                <MdHeadsetMic size={50}/>
            </div>Best Customer Support <br/>
We offer 24/7 customer support.</motion.div>
    </div>
  )
}

export default Features