import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const captain = localStorage.getItem("captain");
  useEffect(() => {
    if (!token && !captain) {
      navigate("/login");
    }
  }, [token]);

  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
