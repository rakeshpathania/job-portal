import React, { useContext } from "react";
import Home from "./pages/Home";
import UserSignup from "./pages/UserSignup.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import { Route, Routes } from "react-router-dom";
import { UserDataContext } from "./context/UserContext.jsx";

const App = () => {
  const userData =  useContext(UserDataContext);
  return(
  <div>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='login' element={<UserLogin/>}/>
    <Route path='signup' element={<UserSignup/>}/>
    <Route path='captain-signup' element={<CaptainSignup/>}/>
    <Route path='captain-login' element={<CaptainLogin/>}/>
    </Routes>
  </div>
  )
};

export default App;
