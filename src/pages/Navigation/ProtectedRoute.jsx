import React from "react";
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, Outlet} from 'react-router-dom'

function ProtectedRoute() {
   const { user } = useContext(AuthContext)
  
  if (!user) {
    
    return <Navigate to="/" />
  }
  return <Outlet/>
}

export default ProtectedRoute;
