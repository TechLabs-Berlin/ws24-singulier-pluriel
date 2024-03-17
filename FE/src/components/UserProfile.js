import { useQuery } from "react-query";
import axios from "axios";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Avatar,
  CircularProgress,
} from "@chakra-ui/react";

// Fetch function is outside of component
const fetchUserData = async () => {
  const { data } = await axios.get("https://swapi.dev/api/people/1/");
  const [name, surname] = data.name.split(" ");
  return { ...data, name, surname: surname || "" };
};

function UserProfile() {
  // useQuery hook for fetching user data
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery("userData", fetchUserData);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const handleLogout = () => {
    console.log("Log out logic here");
    // Placeholder for logout logic
  };

  if (isLoading) {
    return (
      <Box position="fixed" top="2" right="2" p="2">
        <CircularProgress isIndeterminate color="blue.300" size="24px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box position="fixed" top="2" right="2" p="2" bg={bgColor}>
        <Text fontSize="xs">An error occurred while fetching user data.</Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top="2"
      right="2"
      p="2"
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
    >
      <HStack spacing="2" alignItems="center">
        <Avatar size="xs" name={`${userData.name} ${userData.surname}`} />
        <VStack spacing="1" alignItems="flex-start">
          <Text fontSize="sm" fontWeight="bold" color={textColor}>
            {userData.name} {userData.surname}
          </Text>
          <Text fontSize="xs" color={textColor}>
            {userData.title}
          </Text>
        </VStack>
      </HStack>

      <HStack spacing="2">
        <Button
          size="xs"
          variant="outline"
          onClick={() => console.log("Navigate to profile")}
        >
          My Profile
        </Button>
        <Button size="xs" colorScheme="blue" onClick={handleLogout}>
          Log Out
        </Button>
      </HStack>
    </Box>
  );
}

export default UserProfile;
