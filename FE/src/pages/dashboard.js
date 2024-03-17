import { useQuery } from "react-query";
import axios from "axios";
import { Box, Text, CircularProgress } from "@chakra-ui/react";

// Fetch function is outside of component
const fetchPosts = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts?_limit=2"
  );
  return data;
};

function Dashboard() {
  const { data, isLoading, error } = useQuery("posts", fetchPosts);

  if (isLoading) {
    return <CircularProgress isIndeterminate color="blue.300" />;
  }

  if (error) {
    return <Text>An error occurred: {error.message}</Text>;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} m={2} overflow="hidden">
      <Box p={2} backgroundColor="cyan.100" borderRadius="md" mb={4}>
        <Text fontSize="2xl" mb={4} fontWeight="bold">
          My Dashboard
        </Text>
      </Box>
      {data.map((item) => (
        <Box
          key={item.id}
          p={2}
          borderBottomWidth="1px"
          _hover={{ backgroundColor: "blue.100", cursor: "pointer" }}
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {item.title}
          </Text>
          <Text>{item.body}</Text>
        </Box>
      ))}
    </Box>
  );
}

export default Dashboard;
