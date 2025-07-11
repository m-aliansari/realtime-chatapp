import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../../../server/constants/routes";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.AUTH.LOGIN} />;
};
