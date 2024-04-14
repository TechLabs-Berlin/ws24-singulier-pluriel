import { Box, VStack, Link, Text, Image, Stack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import homeIcon from "../assets/home-icon.jpg";
import mailIcon from "../assets/mail-icon.jpg";
import inventoryIcon from "../assets/inventory-icon.jpg";
import bookIcon from "../assets/book-icon.jpg";

const NavBar = () => {
  const location = useLocation();
  const isCourseDetailPage = location.pathname.startsWith("/course-detail/");

  let navItems = [
    { name: "Home", icon: homeIcon, path: "/main" },
    { name: "Communications", icon: mailIcon, path: "/communication" },
    { name: "Grade Center", icon: inventoryIcon, path: "/grade-center" },
  ];
  // Conditionally add Courses to navbar if on the course detail page
  if (isCourseDetailPage) {
    navItems = [
      ...navItems,
      { name: "Courses", icon: bookIcon, path: "/courses" },
    ];
  }

  return (
    <Box w="20%" p={5} bg="gray.100">
      <VStack spacing={4} align="start">
        {navItems.map((item) => (
          <Link
            as={RouterLink}
            to={item.path}
            key={item.name}
            style={{ textDecoration: "none" }}
          >
            <Stack spacing={2} align="center" direction="row">
              <Image src={item.icon} boxSize="25px" />
              <Text
                fontSize="18px"
                fontWeight="600"
                lineHeight="28px"
                color="black"
              >
                {item.name}
              </Text>
            </Stack>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default NavBar;
