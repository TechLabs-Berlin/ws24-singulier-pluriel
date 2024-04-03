import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardBody,
  Heading,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
  Text,
  Flex,
  Box,
  Box,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
const Courses = () => {
  return (
    <Flex>
      <NavBar />

      <Card
        width="441px"
        height="484px"
        left="383px"
        top="204p"
        border="1px"
        colorBackground="#FFFFFF"
        position="absolute"
        boxSizing="border-box"
        margin="65px"
      >
        <CardBody>
          <Heading size="md" margin="top">
            Italian A1.2
          </Heading>
          <Text>Spring semester 2024</Text>
          <Image width="441px" height="184px" top="89px" border="1px" />
        </CardBody>
        <Box boxSize="borderbox">
          <Text
            color="black"
            width="80px"
            height="35px"
            top="420px"
            left="321px"
            fontWeight="700"
            size="24px"
            lineHeight="32px"
            gap="110px"
          >
            Open
          </Text>
        </Box>
      </Card>
    </Flex>
  );
};

export default Courses;
