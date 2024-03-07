import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Text } from "@chakra-ui/react";

function Dashboard() {
  const [data, setData] = useState([]); // State to hold the fetched data
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=2") // Limit to 2 items for test
      .then((response) => {
        setData(response.data); // Set fetched data to state
        setIsLoading(false); // Update loading status
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []); // To ensure effect runs once after the initial render

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} m={2} overflow="hidden">
      <Text fontSize="2xl" mb={4}>
        Dashboard Data Test
      </Text>
      {data.map((item) => (
        <Box
          key={item.id}
          p={2}
          borderBottomWidth="1px"
          _hover={{ backgroundColor: "blue.100", cursor: "pointer" }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {item.title}
          </Text>
          <Text>{item.body}</Text>
        </Box>
      ))}
    </Box>
  );
}
export default Dashboard;
