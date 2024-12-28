import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!token && !user) {
      navigate("/login");
    }
  }, [token]);

  return <div>{children}</div>;
};

export default UserProtectedWrapper;
