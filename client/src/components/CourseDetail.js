import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, Text, CircularProgress, useToast } from "@chakra-ui/react";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile";
import Module from "./Module";
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
      </Flex>
    </Flex>
  );
};

export default CourseDetail;
