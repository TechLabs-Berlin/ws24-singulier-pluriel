import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  VStack,
  Avatar,
  Text,
  useToast,
  useColorModeValue,
  CircularProgress,
} from "@chakra-ui/react";

// Fetch function to get user data - test api
const fetchUserData = async () => {
  const response = await axios.get("https://swapi.dev/api/people/1/");
  // Parsing
  const [firstName, lastName] = response.data.name.split(" ");
  return { ...response.data, firstName, lastName: lastName || "" };
};

function UserProfile() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery("userData", fetchUserData);
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const handleLogout = async () => {
    try {
      await axios.get("https://ws24-singulier-pluriel.onrender.com/api/logout");
      toast({
        title: "Logout Successful",
        description: "You have been successfully logged out.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "There was a problem logging you out. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <CircularProgress isIndeterminate color="blue.500" />;
  }

  if (error) {
    return <Text>An error occurred while fetching user data.</Text>;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top="2"
      right="2"
      p="4"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      width="auto"
    >
      <VStack spacing="2" alignItems="flex-start">
        <Avatar size="md" name={`${userData.firstName} ${userData.lastName}`} />
        <Text fontSize="md" fontWeight="bold" color={textColor}>
          {userData.firstName} {userData.lastName}
        </Text>
        <Text fontSize="sm" color={textColor}>
          {userData.title}
        </Text>
      </VStack>

      <Button colorScheme="blue" size="sm" onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
}

export default UserProfile;
