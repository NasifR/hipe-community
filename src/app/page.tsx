import React from 'react'
import logo from '../../public/images/hipe.png'

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-white'>
        <img src='/images/hipe.png' alt='HIPE Logo' className='w-50 h-50' />
        <h1 className='text-4xl mt-5 font-bold text-black'>Welcome to HIPE Community</h1>
      </div>
  )
}

export default page