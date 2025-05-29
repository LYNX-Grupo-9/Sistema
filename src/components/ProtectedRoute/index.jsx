import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    const userId = localStorage.getItem("idAdvogado");
    return userId; 
  };


const ProtectedRoute = ({ children }) => {
  const isLoggedIn = isAuthenticated();


  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  

  return children;
};

export default ProtectedRoute;