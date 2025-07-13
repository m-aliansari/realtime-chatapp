import {
  Button,
  Heading,
  HStack,
  VStack,
  Separator,
  Text,
  Circle,
  Tabs,
  Dialog,
} from "@chakra-ui/react";

import { MdChat } from "react-icons/md";
import { FriendsContext } from "../../../contexts/Friends/FriendsContext";
import { useContext } from "react";
import { AddFriendModal } from "./AddFriendModal";

export const SideBar = () => {
  const { friendList } = useContext(FriendsContext);

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <VStack py="1.4rem">
        <HStack justify="center" gap="15px" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Dialog.Trigger asChild>
            <Button variant="surface">
              <MdChat size={10} />
            </Button>
          </Dialog.Trigger>
        </HStack>
        <Separator />
        <VStack as={Tabs.List} w="100%" px="2rem">
          {friendList?.length ? (
            friendList.map((friend) => (
              <HStack
                as={Tabs.Trigger}
                value={friend}
                key={friend}
                w="100%"
              >
                <Circle
                  bg={friend.connected ? "green.500" : "red.500"}
                  w="20px"
                  h="20px"
                />
                <Text>{friend}</Text>
              </HStack>
            ))
          ) : (
            <></>
          )}
        </VStack>
      </VStack>
      <AddFriendModal />
    </Dialog.Root>
  );
};
