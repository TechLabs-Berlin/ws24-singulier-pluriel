import React from "react";
import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  VStack,
  Text,
  Image,
  Flex,
  useColorModeValue,
  chakra,
  Stack,
  Grid,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import UserProfile from "../components/UserProfile";
import axios from "axios";
import UniLogo from "../assets/UNI-LOGO.png";

// Get courses
const fetchCourses = async () => {
  const { data } = await axios.get("/courses");
  return data;
};

// Component for individual course cards for later refactoring
const CourseCard = ({ course }) => {
  const defaultImageUrl = "http://via.placeholder.com/150";
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <Box
      as={RouterLink}
      to={`/course-detail/${course._id}`}
      bg={useColorModeValue("#01427A")}
      w="full"
      maxW="calc(50% - 1rem)"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      display="flex"
      flexDirection="column"
      cursor="pointer"
      m="2"
    >
      <Text fontSize="lg" fontWeight="bold" textAlign="center" mt="2">
        {course.title}
      </Text>
      <Image
        src={course.image?.url || defaultImageUrl}
        alt={`Image of ${course.title}`}
        roundedTop="lg"
        objectFit="cover"
        h="150px"
        w="full"
      />
      <Box p="6">
        <Text fontSize="sm" noOfLines={2} mb="2">
          {course.description}
        </Text>
        <Stack spacing={1}>
          <Text fontSize="sm">
            <chakra.span fontWeight="bold">Begin:</chakra.span>{" "}
            {formatDate(course.startDate)}
          </Text>
          <Text fontSize="sm">
            <chakra.span fontWeight="bold">Ends:</chakra.span>{" "}
            {formatDate(course.endDate)}
          </Text>
          <Text fontSize="sm">
            <chakra.span fontWeight="bold">Exam Dates:</chakra.span>{" "}
            {formatDate(course.examDate)}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

// Main component for the courses page
const Courses = () => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery("courses", fetchCourses);

  return (
    <Flex>
      <NavBar />
      <Image
        src={UniLogo}
        mx="auto"
        width="270px"
        height="182px"
        left="244px"
        gap="0px"
        border-radius="12px 0px 0px 0px"
        opacity="0px"
      />
      <Flex direction="column" flex="1" ml={{ base: 0, md: 60 }} pt="4">
        <UserProfile />
        <VStack spacing={4} align="stretch" mt="5">
          <Text fontSize="2xl" mb="4" textAlign="center">
            Courses
          </Text>
          <Flex direction="row" gap="4" wrap="wrap" justify="center">
            {isLoading
              ? "Loading..."
              : isError
              ? "An error occurred"
              : courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
          </Flex>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default Courses;
