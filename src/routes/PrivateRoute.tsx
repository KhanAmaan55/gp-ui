import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const registered = localStorage.getItem("reg");
  return token && registered  ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
