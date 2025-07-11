import { createContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../constants/api";
import { useNavigate } from "react-router-dom";
import { ROUTE_NAMES } from "../constants/routes";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/login`, {
      method: "GET",
      credentials: "include",
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          return setUser({ loggedIn: false });
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return setUser({ loggedIn: false });
        if (!data.loggedIn) return setUser({ loggedIn: false });
        setUser({ ...data });
        return navigate(ROUTE_NAMES.HOME);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
