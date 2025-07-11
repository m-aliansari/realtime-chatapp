import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { SideBar } from "./Chat/FriendList/SideBar";
import { ChatMessages } from "./Chat/ChatMessages";
import { FriendsContextProvider } from "../contexts/FriendsContext";

export const Home = () => {
  return (
    <FriendsContextProvider>
      <Tabs.Root
        templateColumns={"repeat(10, 1fr)"}
        h="100vh"
        as={Grid}
        variant="subtle"
      >
        <GridItem colSpan={"3"} borderRight={"1px solid gray"}>
          <SideBar />
        </GridItem>
        <GridItem colSpan={"7"}>
          <ChatMessages />
        </GridItem>
      </Tabs.Root>
    </FriendsContextProvider>
  );
};
