import { Box, Text, Image, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import UserProfile from "./UserProfile";

const NavBar = () => {
  return (
    <Box w="20%" p={5} bg="gray.100" minH="100vh">
      <Box mb={8} textAlign="center">
        <Image src="http://via.placeholder.com/50x80" alt="Logo" mx="auto" />
        <Text mt={2}>The Logo Text</Text>
      </Box>

      <VStack spacing={4} align="start">
        <Link as={RouterLink} to="/">
          Home
        </Link>
        <Link as={RouterLink} to="/communication">
          Communications Announcements
        </Link>
        <Link as={RouterLink} to="/grade-center">
          Grade Center
        </Link>
        <Box>
          <UserProfile />
        </Box>
      </VStack>
    </Box>
  );
};
export default NavBar;
