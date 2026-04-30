import React from 'react'

const Policy = () => {
  return (
    <>
    {/* items-center */}
    <div className='flex justify-center flex-col'>
        <h1 className='font-semibold text-2xl font-sans mb-4 text-center'>Subscribe & Get 40% Off</h1>
        <p className='mb-4 text-gray-500 text-center'>Join our community and enjoy exclusive discounts, curated collections, and insider access - straight to your inbox</p>
        <div className='flex flex-row items-center justify-center mb-12'>
            <input type="email" placeholder='Enter your Email' className='border rounded-l-sm h-10 w-1/2 px-3'/>
            <button type="submit" className=' bg-black text-white px-6 text-sm h-10 rounded-r-sm'>Subscribe</button>
        </div>
    </div>
    </>
  )
}

export default Policy