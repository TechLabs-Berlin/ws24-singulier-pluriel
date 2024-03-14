import MainCard from "./components/MainCard";
import SearchBar from "./components/SearchBar";
import Dashboard from "./pages/dashboard";
import UserProfile from "./components/UserProfile";
import { Flex, Text } from "@chakra-ui/react";
function App() {
  return (
    <div>
      <Text fontStyle="italic">Universita Libera di Livorno</Text>
      <UserProfile />
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
    </div>
  );
}
export default App;
