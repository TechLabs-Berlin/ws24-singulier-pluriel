import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  VStack,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile";
import Module from "./Module";
import HelpButton from "./HelpButton";
import LmsUniLogo from "./LmsUniLogo";
import axios from "axios";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await axios.get(`/courses/${courseId}`);
        setCourse(data);
      } catch (error) {
        toast({
          title: "Error fetching course details",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, toast]);

  const helpText = (
    <>
      <Text as="p" mb={2}>
        Welcome to your course! As a course instructor, you can{" "}
        <strong>add Modules</strong> by clicking on the corresponding button and
        providing a name.
      </Text>
      <Text as="p" mb={2}>
        You’ll then be able to <strong>UPLOAD</strong> a file from your
        computer, <strong>ADD A LINK</strong> from the web, or{" "}
        <strong>ADD MULTIMEDIA RESOURCES</strong> like H5P materials or exercise
        that integrate videos or images.
      </Text>
      <Text as="p" mb={2}>
        You can also access your <strong>graphical dashboards</strong>, provide
        you data around your course like student attendance, performance, and
        feedback from course participants.
      </Text>
      <Text as="p" mb={2}>
        You can go back to the home page using the <strong>HOME</strong> button;
        access a list of your current courses using the <strong>COURSES</strong>{" "}
        button; go to the <strong>COMMUNICATION</strong> section to send and
        receive messages / organise group work / publish and visualise
        announcements; and navigate to the <strong>GRADE CENTER</strong> to
        schedule exam and grade students.
      </Text>
    </>
  );
  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh">
        <CircularProgress isIndeterminate color="blue.500" />
      </Flex>
    );
  }

  return (
    <Box bg="linear-gradient(0deg, rgba(0, 17, 68, 0.06), rgba(0, 17, 68, 0.06)), linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88))">
      <Flex direction="row" align="start" w="full">
        <Flex direction="column" minW="20%">
          <LmsUniLogo />
          <NavBar />
        </Flex>
        <VStack
          flex="1"
          spacing={4}
          align="stretch"
          maxW="1200px"
          mx="auto"
          px={4}
          mt={{ base: "0", md: "20" }}
        >
          <UserProfile />
          <Text fontSize="2xl" mb="4" fontWeight="bold">
            {course ? course.title : "Course not found"}
          </Text>
          <Module />
          <HelpButton helpText={helpText} />
        </VStack>
      </Flex>
    </Box>
  );
};

export default CourseDetail;
