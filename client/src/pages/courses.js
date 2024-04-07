import React from "react";
import { useQuery } from "react-query";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Flex,
  chakra,
  Stack,
  Center,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import UserProfile from "../components/UserProfile";
import HelpButton from "../components/HelpButton";
import LmsUniLogo from "../components/LmsUniLogo";
import axios from "axios";

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
      bg="#01427A"
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
      color="white"
    >
      <Text fontSize="lg" fontWeight="bold" textAlign="center" mt="4">
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

  const helpText = (
    <>
      <Text as="p" mb={2}>
        You’re currently in the <strong>Course selection </strong> page. All of
        the courses that you are teaching or attending this semester will be
        displayed here. Click on <strong>OPEN</strong> to navigate to the
        corresponding course.
      </Text>
      <Text as="p" mb={2}>
        Access your <strong>graphical dashboards</strong> to visualise
        information like attendance and student progress for the current
        semester as a whole across all classes you are currently teaching. You
        can find graphical dashboards related to a single course in that
        course’s page.
      </Text>
      <Text as="p" mb={2}>
        You can visualise courses you have attended in{" "}
        <strong>previous semesters </strong> by clicking on the corresponding
        buttons in the “Previous Semesters” section.
      </Text>
      <Text as="p" mb={2}>
        Click on <strong>HOME</strong> if you want to go back to the home page;{" "}
        <strong>COMMUNICATION</strong> if you want to send and receive messages,
        post and see announcements, manage or participate in group work;{" "}
        <strong>GRADES CENTER</strong> if you want to see your transcripts and
        book an exam (as a student) or schedule an exam and grade students (as a
        course instructor).
      </Text>
    </>
  );
  return (
    <Box bg="linear-gradient(0deg, rgba(0, 17, 68, 0.06), rgba(0, 17, 68, 0.06)), linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88))">
      <LmsUniLogo />
      <Flex direction="row" w="full">
        <Box minWidth="20%">
          <NavBar />
        </Box>
        <Flex direction="column" flex="1" align="center" overflowX="hidden">
          <UserProfile />
          <Center>
            <Text fontSize="2xl" mb="4" fontWeight="bold">
              Courses
            </Text>
          </Center>
          <Flex direction="row" wrap="wrap" justify="center" gap={4}>
            {isLoading
              ? "Loading..."
              : isError
              ? "An error occurred"
              : courses.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
          </Flex>
          <HelpButton helpText={helpText} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Courses;
