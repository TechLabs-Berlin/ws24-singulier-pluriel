import React, { useState, useEffect } from "react";
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

function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    title: "Jedi Master",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://swapi.dev/api/people/1/") // Fetching fake data as an example
      .then((response) => {
        const [name, surname] = response.data.name.split(" ");
        setUserData((prevData) => ({
          ...prevData,
          name: name,
          surname: surname || "",
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(error);
        setIsLoading(false);
      });
  }, []);

  const handleLogout = () => {
    console.log("Log out logic here");
    // Logout logic here
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
      position="relative"
      p={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
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
