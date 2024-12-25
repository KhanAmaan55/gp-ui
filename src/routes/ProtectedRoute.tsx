import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const sessionExpired = sessionStorage.getItem("sessionExpired");
  return sessionExpired ? children : <Navigate to="/home" />;
};

export default ProtectedRoute;
