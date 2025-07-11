import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useAuth = () => {
  const { user } = useContext(UserContext);
  return user && user.loggedIn;
};
