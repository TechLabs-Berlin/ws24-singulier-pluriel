import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, CircularProgress, useToast } from "@chakra-ui/react";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile";
import Module from "./Module";
import HelpButton from "./HelpButton";
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
    <Flex>
      <NavBar />
      <Flex direction="column" as="main" p={5} w="80%">
        <UserProfile />
        <Text fontSize="2xl" mb="4">
          {course ? course.title : "Course not found"}
        </Text>
        <Module />
        <HelpButton helpText={helpText} />
      </Flex>
    </Flex>
  );
};

export default CourseDetail;
