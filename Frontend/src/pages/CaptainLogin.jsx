import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captain/login`,
        captainData
      );
      if (response.status === 200) {
        const data = response?.data;
        setCaptain(data?.captain);
        localStorage.setItem("captain", JSON.stringify(response.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(captain, "captainData");
  }, [captain]);
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10 "
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e) => handleLogin(e)}>
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
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-500">
            {" "}
            Sign up as captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full mt-4"
        >
          Sign in as user
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
