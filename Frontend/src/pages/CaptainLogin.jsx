import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});
  const handleLogin = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    
  };
  useEffect(() => {
    console.log(captainData, "captainData");
    
  }, [captainData]);
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e)=>handleLogin(e)}>
          <h3 className="text-xl font-medium mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
          />
          <h3 className="text-xl font-medium mb-2">What's your password?</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="enter your password"
          />
          <button className="bg-black text-white font-semibold mb-3 rounded px-4 py-2 w-full mt-4">
            Login
          </button>
        </form>
        <p className="text-center ">
          Join a fleet? <Link to= "/captain-signup"className="text-blue-500"> Sign up as captain</Link>
        </p>
      </div>
      <div>
        <Link to='/login' className="bg-[#d5622d] flex justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full mt-4">
          Sign in as user
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin