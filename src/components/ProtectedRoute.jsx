import React from "react";
import useAuthStore from "../store/useAuthStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet {...props}></Outlet>;
};

export default ProtectedRoute;
