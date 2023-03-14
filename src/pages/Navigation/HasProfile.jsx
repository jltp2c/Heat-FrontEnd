import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const HasProfile = () => {
  const { user } = useContext(AuthContext);

  if (user.profile) {
    return <Navigate to="/board/profile" />;
  }

  return <Outlet />;
};

export default HasProfile;
