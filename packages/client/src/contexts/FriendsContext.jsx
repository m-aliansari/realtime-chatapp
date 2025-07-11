import { createContext, useState } from "react";

export const FriendContext = createContext();

export const FriendsContextProvider = ({ children }) => {
  const [friendList, setFriendList] = useState([
    { id: 1, username: "John Doe", connected: false },
    { id: 2, username: "John Smith", connected: true },
    { id: 3, username: "Michael", connected: false },
  ]);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      {children}
    </FriendContext.Provider>
  );
};
