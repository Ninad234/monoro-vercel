import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Collection from '../components/Collection'

const Collections = () => {
  return (
    <>
     <Navbar/>
    <div className='min-h-screen mt-9'>
        <Collection/>
    </div>
    <Footer/>
    </>
  )
}

export default Collections