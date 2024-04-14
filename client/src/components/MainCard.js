import { useNavigate } from "react-router-dom";
import { Button, Image, VStack } from "@chakra-ui/react";
import coursesImage from "../assets/courses.jpg";
import communicationImage from "../assets/communication.jpg";
import gradeCenterImage from "../assets/grade-center.jpg";

function MainCard({ title }) {
  const navigate = useNavigate();

  const images = {
    Courses: coursesImage,
    Communication: communicationImage,
    "Grade Center": gradeCenterImage,
  };

  const handleCardClick = () => {
    let path = "/";
    switch (title) {
      case "Courses":
        path = "/courses";
        break;
      case "Communication":
        path = "/communication";
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
    <VStack
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      spacing={4}
      align="center"
    >
      <Image
        src={images[title]}
        alt={title}
        borderRadius="md"
        boxSize="200px"
        objectFit="cover"
      />
      <Button
        onClick={handleCardClick}
        colorScheme="red"
        variant="solid"
        backgroundColor="#E14177"
        color="black"
        _hover={{
          bg: "#c12d56",
        }}
        width="full"
      >
        {title}
      </Button>
    </VStack>
  );
}

export default MainCard;
