import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { PrivateRoutes } from "./PrivateRoutes";
import { Text } from "@chakra-ui/react";
import { UserContext } from "../contexts/UserContext";
import { Home } from "./Home";
import { FriendsContextProvider } from "../contexts/Friends/FriendsContextProvider.jsx";
import { MessagesContextProvider } from "../contexts/Messages/MessagesContextProvider.jsx";

export const Views = () => {
  const { user } = useContext(UserContext);
  
  return user.loggedIn === null ? (
    <Text>Loading....</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route element={<PrivateRoutes />}>
        <Route
          path="/home"
          element={
            <FriendsContextProvider>
              <MessagesContextProvider>
                <Home />
              </MessagesContextProvider>
            </FriendsContextProvider>
          }
        />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
