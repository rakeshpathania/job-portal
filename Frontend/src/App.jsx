import React from "react";
import Start from "./pages/Start.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
        <Route path="captain-signup" element={<CaptainSignup />} />
        <Route path="captain-login" element={<CaptainLogin />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
