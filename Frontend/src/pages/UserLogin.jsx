import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const handleLogin = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });
    
  };
  useEffect(() => {
    console.log(userData, "userData");
    
  }, [userData]);

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
          New here? <Link to= "/signup"className="text-blue-500">Create new account</Link>
        </p>
      </div>
      <div>
        <Link to='/captain-login' className="bg-[#10b461] flex justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full mt-4">
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
