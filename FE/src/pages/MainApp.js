import React from "react";
import UserProfile from "../components/UserProfile";
import MainCard from "../components/MainCard";
import SearchBar from "../components/SearchBar";
import Dashboard from "./dashboard";
import { Box, Text, Flex } from "@chakra-ui/react";

const MainApp = () => {
  return (
    <Box>
      <Text fontStyle="italic" m="4">
        Universita Libera di Livorno
      </Text>
      <UserProfile />
      <Flex direction="column" align="center" mt="4">
        <Flex wrap="wrap" justify="center" gap="4">
          <MainCard title="Courses" />
          <MainCard title="Communication & Announcements" />
          <MainCard title="Grade Center" />
        </Flex>
        <SearchBar />
        <Dashboard />
      </Flex>
    </Box>
  );
};

export default MainApp;
