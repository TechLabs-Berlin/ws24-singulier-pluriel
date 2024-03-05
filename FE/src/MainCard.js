import { useNavigate } from "react-router-dom";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

function MainCard({ title }) {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  const handleCardClick = () => {
    let path = "/";
    switch (title) {
      case "Courses":
        path = "/courses";
        break;
      case "Communication":
        path = "/communication";
        break;
      case "Announcements":
        path = "/announcements";
        break;
      case "Grade Center":
        path = "/grade-center";
        break;
      default:
        path = "/";
    }
    navigate(path);
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      _hover={{ bg: hoverBgColor }}
      onClick={handleCardClick}
      cursor="pointer"
      p={4}
      m={2}
    >
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        {title}
      </Text>
    </Box>
  );
}

export default MainCard;
