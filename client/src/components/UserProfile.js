import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

// Enable axios to send cookies with every request
axios.defaults.withCredentials = true;

// Function to get user data
const fetchUserData = async () => {
  const response = await axios.get("/userprofile");
  return response.data;
};

function UserProfile() {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery("userData", fetchUserData, {
    retry: false, // Disable retry for fetching user data
  });

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      toast({
        title: "Logout Successful",
        description: "You have been successfully logged out.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "There was a problem logging you out. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress isIndeterminate color="blue.500" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" p="4" m="4" bg={bgColor}>
        <Text color={textColor}>
          An error occurred while fetching user data: {error.message}
        </Text>
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
      p="4"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="md"
      width="auto"
    >
      <VStack spacing="2" alignItems="flex-start">
        <Avatar size="sm" name={`${userData.name}`} />
        <Text fontSize="md" fontWeight="bold" color={textColor}>
          {userData.name}
        </Text>
        <Text fontSize="sm" color={textColor}>
          {userData.role}
        </Text>
      </VStack>

      <Button colorScheme="blue" size="sm" onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
}

export default UserProfile;
