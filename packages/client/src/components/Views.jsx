import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { PrivateRoutes } from "./PrivateRoutes";
import { Text } from "@chakra-ui/react";
import { UserContext } from "../contexts/UserContext";
import { Home } from "./Home";

export const Views = () => {
  const { user } = useContext(UserContext);
  return user.loggedIn === null ? (
    <Text>Loading....</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
