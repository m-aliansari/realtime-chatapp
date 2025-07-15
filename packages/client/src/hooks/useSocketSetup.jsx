import { useContext, useEffect } from "react";
import { socket } from "../utils/socket.js";
import { UserContext } from "../contexts/UserContext.jsx";
import { SOCKET_EVENTS } from "@realtime-chatapp/common";
import { FriendsContext } from "../contexts/Friends/FriendsContext.js";

export const useSocketSetup = () => {
  const { setUser } = useContext(UserContext);
  const { setFriendList } = useContext(FriendsContext);
  useEffect(() => {
    socket.connect();

    socket.on(SOCKET_EVENTS.FRIENDS_LIST, (friendList) => {
      setFriendList(friendList);
    });

    socket.on(SOCKET_EVENTS.CONNECTION_STATUS_CHANGED, (status, username) => {
      setFriendList((prevFriends) => {
        return prevFriends.map((friend) => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });

    socket.on("connect_error", (e) => {
      console.log(e);

      console.log("connection error in useSocketSetup hook");
      setUser({ loggedIn: false });
    });

    return () => {
      socket.removeAllListeners();;
    };
  }, []);
};
