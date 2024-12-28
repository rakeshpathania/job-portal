import { useState } from "react";
import { createContext } from "react";

const CaptainDataContext = createContext();

const CaptainContext = ({children}) => {
  const [captain, setCaptain] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
    phoneNumber: "",
    vehicle: {
      vehicleType: "",
      colour: "",
      regNumber: "",
      capacity: "",
    },
    location: {
      lat: "",
      long: "",
    },
    isAvailable: false,
  });
  return (
    <div>
      <CaptainDataContext.Provider value={{ captain, setCaptain }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};
export { CaptainContext, CaptainDataContext };
