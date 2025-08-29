import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // tu token JWT
  if (!token) {
    // Si no hay token, redirige a login
    return <Navigate to="/login" replace />;
  }
  // Si hay token, permite acceder
  return children;
};

export default PrivateRoute;
