import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
        userData
      );
      if (response?.status === 200) {
        const data = response?.data;
        setUser(data?.user);
        const { password, ...userWithoutPassword } = data?.user;
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        localStorage.setItem("token", data?.token);
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(user, "userData");
  }, [user]);

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
          New here?{" "}
          <Link to="/signup" className="text-blue-500">
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] flex justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full mt-4"
        >
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
