import MainCard from "./MainCard";
import SearchBar from "./SearchBar";
import Dashboard from "./pages/dashboard";
import { Flex } from "@chakra-ui/react";
function App() {
  return (
    <div>
      <div>Universita Libera di Livorno</div>
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <MainCard title="Courses" />
        <MainCard title="Communication" />
        <MainCard title="Announcements" />
        <MainCard title="Grade Center" />
      </Flex>
      <SearchBar />
      <Dashboard />
    </div>
  );
}
export default App;
