import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const newUserData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      phoneNumber: phoneNumber,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/register`,
        newUserData
      );
      if (response.status === 201) {
        const data = response.data;
        setUser(data?.user);
        const { password, ...userWithoutPassword } = data?.user;
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        localStorage.setItem("token", data?.token);
        navigate("/home");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10 "
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt=""
          />
          <form onSubmit={(e) => handleSignup(e)}>
            <h3 className="text-lg font-medium mb-2">What's your name?</h3>
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="first name"
              />
              <input
                className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last name"
              />
            </div>

            <h3 className="text-lg font-medium mb-2">Enter your email</h3>
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@example.com"
            />
            <h3 className="text-lg font-medium mb-2">Enter your password</h3>
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="enter your password"
            />
            <h3 className="text-lg font-medium mb-2">
              Enter your phone number
            </h3>
            <input
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              maxLength={10}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              placeholder="enter your phone number"
            />

            <button className="bg-black text-white font-semibold mb-3 rounded px-4 py-2 w-full mt-4">
              Sign Up
            </button>
          </form>
          <p className="text-center ">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login as User
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[11px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of service apply</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
