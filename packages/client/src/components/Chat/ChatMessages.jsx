import { Tabs, VStack } from "@chakra-ui/react";
import { FriendsContext } from "../../contexts/Friends/FriendsContext.js";
import { useContext } from "react";

export const ChatMessages = () => {
  const { friendList } = useContext(FriendsContext);
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
