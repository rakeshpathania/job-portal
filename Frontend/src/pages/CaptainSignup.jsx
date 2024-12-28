import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [colour, setColour] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      vehicle: {
        vehicleType: vehicleType,
        colour: colour,
        regNumber: regNumber,
        capacity: capacity,
      },
      location: {
        lat: 0,
        long: 0,
      },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captain/register`,
        captainData
      );
      if (response?.status === 201) {
        const data = response?.data;
        // Create a copy of the captain object without the password
        let { password, ...captainWithoutPassword } = data?.captain;
        localStorage.setItem("captain", JSON.stringify(captainWithoutPassword));
        localStorage.setItem("token", data?.token);
        setCaptain(data?.captain);
        navigate("/home");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setVehicleType("");
        setColour("");
        setRegNumber("");
        setCapacity("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(captain);
  }, [captain]);
  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div className="mb-10">
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
            <h3 className="text-lg font-medium mb-2">Enter your password?</h3>
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
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div>
              <div className="flex gap-4">
                <select
                  className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    select vehicle type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="bike">Bike</option>
                </select>
                <input
                  className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  type="text"
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  required
                  placeholder="colour"
                />
              </div>
              <div className="flex gap-4">
                <input
                  className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  type="text"
                  value={regNumber}
                  onChange={(e) => setRegNumber(e.target.value)}
                  required
                  placeholder="reg. number"
                />
                <input
                  className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                  placeholder="capacity"
                />
              </div>
            </div>

            <button className="bg-black text-white font-semibold mb-3 rounded px-4 py-2 w-full mt-4">
              Sign Up
            </button>
          </form>
          <p className="text-center ">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-500">
              Login as captain
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

export default CaptainSignup;
