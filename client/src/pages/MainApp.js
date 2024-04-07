import React from "react";
import UserProfile from "../components/UserProfile";
import MainCard from "../components/MainCard";
import SearchBar from "../components/SearchBar";
import Dashboard from "../components/dashboard";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import HelpButton from "../components/HelpButton";
import LmsUniLogo from "../components/LmsUniLogo";

const MainApp = () => {
  const helpText = (
    <>
      <Text as="p" mb={2}>
        <strong>Courses:</strong> takes you to a section where you can find
        materials and assignments for classes in the current semester. You can
        also visit an archive of content from previous semesters.
      </Text>
      <Text as="p" mb={2}>
        <strong>Communication:</strong> allows you to send mails and
        announcements to fellow students and to course instructors and to manage
        group work and Zoom calls.
      </Text>
      <Text as="p" mb={2}>
        <strong>Grade Center:</strong> allows you to visualise your exam
        transcripts and book exams (if you’re a student) or organise exams and
        grade students (if you’re a course instructor).
      </Text>
    </>
  );
  return (
    <Box
      position="relative"
      bg="linear-gradient(0deg, rgba(0, 17, 68, 0.06), rgba(0, 17, 68, 0.06)), linear-gradient(0deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88))"
    >
      <LmsUniLogo />
      <Flex direction="column" align="center">
        <VStack spacing={4} align="stretch">
          <UserProfile />
          <Flex wrap="wrap" justify="center" gap="4">
            <MainCard title="Courses" />
            <MainCard title="Communication" />
            <MainCard title="Grade Center" />
          </Flex>
          <Flex justify="center" w="full" pr={5}>
            <SearchBar />
          </Flex>
          <Dashboard />
        </VStack>
      </Flex>
      <HelpButton helpText={helpText} />
    </Box>
  );
};

export default MainApp;
