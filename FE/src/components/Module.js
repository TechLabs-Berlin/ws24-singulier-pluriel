import React from "react";
import { Box, Text, CircularProgress } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";

// Hardcoded course ID for testing
const courseId = "65f759075c4fed3b11c0656e";

const fetchCourseDetails = async () => {
  const { data } = await axios.get(`/courses/${courseId}`);
  return data;
};

const Module = () => {
  const {
    data: course,
    isLoading,
    error,
  } = useQuery(["courseDetails", courseId], fetchCourseDetails, {
    retry: false,
  });

  if (isLoading) return <CircularProgress isIndeterminate color="blue.500" />;
  if (error) return <Text>An error occurred: {error.message}</Text>;

  return (
    <Box p={5} shadow="md" borderWidth="1px" mt="4">
      <Text fontSize="xl">Modules for {course.title}</Text>
      {/* Placeholder for functionalities */}
    </Box>
  );
};

export default Module;
