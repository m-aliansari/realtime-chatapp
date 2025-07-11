import { Tabs, VStack } from "@chakra-ui/react";
import { FriendContext } from "../../contexts/FriendsContext";
import { useContext } from "react";

export const ChatMessages = () => {
  const { friendList } = useContext(FriendContext);
  return (
    <VStack justify="center" p="5rem">
      {friendList?.length ? (
        <>
          {friendList.map((friend) => (
            <Tabs.Content value={friend.id} key={friend.id}>
              {friend.username}
            </Tabs.Content>
          ))}
        </>
      ) : (
        <></>
      )}
    </VStack>
  );
};
