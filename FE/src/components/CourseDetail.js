import React from "react";
import { useParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";
import UserProfile from "./UserProfile";
import Module from "./Module";

const CourseDetail = () => {
  const { courseId } = useParams();

  return (
    <Flex>
      <NavBar />
      <Flex direction="column" as="main" p={5} w="80%">
        <UserProfile />
        <Text fontSize="2xl" mb="4">
          Course Details for {courseId}
        </Text>
        <Module />
      </Flex>
    </Flex>
  );
};

export default CourseDetail;
