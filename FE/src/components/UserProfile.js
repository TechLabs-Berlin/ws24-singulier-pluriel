import { Box, Text, Button, VStack, useColorModeValue } from "@chakra-ui/react";

function UserProfile() {
  // Placeholder user data
  const userData = {
    name: "Loredano",
    surname: "Tarchiato",
    title: "Course Instructor",
  };

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      position="fixed"
      top={4}
      right={4}
      p={4}
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
    >
      <VStack spacing={2}>
        <Text fontSize="md" fontWeight="bold" color={textColor}>
          {userData.name} {userData.surname}
        </Text>
        <Text fontSize="sm" color={textColor}>
          {userData.title}
        </Text>
        <Button size="sm" colorScheme="blue">
          Log Out
        </Button>
      </VStack>
    </Box>
  );
}

export default UserProfile;
