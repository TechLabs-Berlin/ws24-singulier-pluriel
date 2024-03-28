import { Box, Text, Image, VStack, Link } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const isCourseDetailPage = location.pathname.startsWith("/course-detail/");

  return (
    <Box w="20%" p={5} bg="gray.100" minH="100vh">
      <Box mb={8} textAlign="center">
        <Image src="http://via.placeholder.com/50x80" alt="Logo" mx="auto" />
        <Text fontStyle="italic" m="4">
          Universita Libera di Livorno
        </Text>
      </Box>

      <VStack spacing={4} align="start">
        <Link as={RouterLink} to="/main">
          Home
        </Link>
        <Link as={RouterLink} to="/communication">
          Communications
        </Link>
        <Link as={RouterLink} to="/grade-center">
          Grade Center
        </Link>
        {/* Conditionally render the "Courses" link */}
        {isCourseDetailPage && (
          <Link as={RouterLink} to="/courses">
            Courses
          </Link>
        )}
      </VStack>
    </Box>
  );
};

export default NavBar;
