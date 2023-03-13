import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) return <div>Loading</div>;
  if (!user) {
    console.log("trying to access protected route - redirecting", user);
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
