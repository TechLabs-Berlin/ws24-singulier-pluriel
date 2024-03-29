import React from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  CircularProgress,
  Divider,
  Image,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";

// Hardcoded course ID for testing
const courseId = "66058984b6a2fc1cae5f6d83";

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
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" mb={4}>
        Modules
      </Text>
      <Box borderWidth="1px" p={5} shadow="md">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="xl">Lesson 19 (28.03.2024)</Text>
          <HStack>
            <Button size="sm" colorScheme="blue">
              Edit Module
            </Button>
            <Button size="sm" colorScheme="red">
              Delete Module
            </Button>
          </HStack>
        </Flex>
        <Divider my={4} />
        <Flex alignItems="center">
          <Image
            src="/assets/icon.jpg"
            alt="Restaurant"
            boxSize="100px"
            objectFit="cover"
            marginRight={4}
          />
          <Box flex="1">
            <Text fontSize="lg">
              {course?.title || "Loading course title..."}
            </Text>
            <HStack mt={2}>
              <Button size="sm" colorScheme="red">
                Delete
              </Button>
            </HStack>
          </Box>
        </Flex>
        <Divider my={4} />
        <Flex justifyContent="center">
          <Button size="sm" colorScheme="green">
            Upload
          </Button>
          <Button size="sm" colorScheme="purple">
            Add link
          </Button>
          <Button size="sm" colorScheme="orange">
            Add Multimedia Resources
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
};

export default Module;
