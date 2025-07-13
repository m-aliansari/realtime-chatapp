import { useContext, useEffect } from "react";
import { socket } from "../utils/socket.js";
import { UserContext } from "../contexts/UserContext.jsx";
import { SOCKET_EVENTS } from "@realtime-chatapp/common";

export const useSocketSetup = (setFriendList) => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    socket.connect();

    socket.on(SOCKET_EVENTS.FRIENDS_LIST, (friendList) =>
      setFriendList(friendList)
    );

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);
};
