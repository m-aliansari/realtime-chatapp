import { Grid, GridItem, Tabs, useTabs } from "@chakra-ui/react";
import { SideBar } from "./Chat/FriendList/SideBar";
import { ChatMessages } from "./Chat/ChatMessages";
import { useSocketSetup } from "../hooks/useSocketSetup.jsx";

export const Home = () => {
  const tabs = useTabs();

  useSocketSetup();

  return (
    <Tabs.RootProvider value={tabs}>
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
    </Tabs.RootProvider>
  );
};
