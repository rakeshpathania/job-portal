import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img className= "w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white pb-4 py-4 px-4'>
            <h2 className='text-[30px] font-bold'>Get Started With Uber</h2>
            <Link to="/login" className=' flex justify-center w-full bg-black text-white py-3 rounded-lg mt-4'>
                Continue
            </Link>
        </div>

    </div>
    </div>
  )
}

export default Home