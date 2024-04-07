import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  VStack,
  HStack,
  Avatar,
  Text,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import instructorImage from "../assets/instructor.jpg";

//Enable axios to send cookies with every request
axios.defaults.withCredentials = true;

//Function to get user data
const fetchUserData = async () => {
  const response = await axios.get("/auth/userprofile");
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
  } = useQuery("userData", fetchUserData, { retry: false });

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      toast({
        title: "Logout Successful",
        description: "You have been successfully logged out.",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "There was a problem logging you out. Please try again.",
        status: "error",
        duration: 3000,
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
      <Box display="flex" justifyContent="center" p="4" m="4" bg="#FEEBCB">
        <Text>An error occurred while fetching user data: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      bottom="31px"
      left="31px"
      p="4"
      bg="#FEEBCB"
      borderRadius="10px"
      border="1px solid #E2E8F0"
      width="274px"
      height="128px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <HStack spacing="4">
        <Avatar
          size="lg"
          name={userData.name}
          src={instructorImage}
          borderRadius="9999px"
        />
        <VStack spacing="0" alignItems="start">
          <Text fontSize="lg" fontWeight="normal" lineHeight="7">
            {userData.name}
          </Text>
          <Text fontSize="sm">{userData.role}</Text>
        </VStack>
      </HStack>
      <HStack spacing="4">
        <Button
          colorScheme="orange"
          size="md"
          variant="solid"
          width="125px"
          height="40px"
        >
          View Profile
        </Button>
        <Button
          colorScheme="orange"
          size="md"
          variant="solid"
          width="93px"
          height="40px"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </HStack>
    </Box>
  );
}

export default UserProfile;
