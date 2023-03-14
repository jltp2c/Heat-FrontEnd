import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

function IsLoggedIn() {
  const { isLoading, user } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/board/profile" />;
  }

  return <Outlet />;
}

export default IsLoggedIn;
