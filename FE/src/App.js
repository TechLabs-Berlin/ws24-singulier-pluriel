import React from "react";
import MainCard from "./components/MainCard";
import SearchBar from "./components/SearchBar";
import Dashboard from "./pages/dashboard";
import UserProfile from "./components/UserProfile";
import { Flex, Text, Box } from "@chakra-ui/react";

function App() {
  return (
    <Box>
      <Text fontStyle="italic" m={4}>
        Universita Libera di Livorno
      </Text>
      <UserProfile />
      <Flex
        direction="column"
        alignItems="center"
        mt={{ base: "100px", md: "24px" }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          justifyContent="center"
          alignItems="center"
        >
          <MainCard title="Courses" />
          <MainCard title="Communication & Announcements" />
          <MainCard title="Grade Center" />
        </Flex>
        <SearchBar />
        <Dashboard />
      </Flex>
    </Box>
  );
}

export default App;
