import { Box, Text } from "@chakra-ui/react";

function Dashboard() {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} m={2} overflow="hidden">
      {/* Blue box for "My Dashboard" */}
      <Box p={2} backgroundColor="blue.100" borderRadius="md" mb={4}>
        <Text fontSize="2xl" mb={2} fontWeight="bold" color="black">
          My Dashboard
        </Text>
      </Box>
      {/* Date and announcement with white background */}
      <Text fontSize="lg" mb={2} fontWeight="bold">
        30.01.2024, 11:20
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Instructions for Extra-Curricular Students Enrolled in Language Classes
      </Text>
    </Box>
  );
}

export default Dashboard;
