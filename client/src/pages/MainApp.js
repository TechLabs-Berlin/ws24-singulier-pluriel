import React from "react";
import UserProfile from "../components/UserProfile";
import MainCard from "../components/MainCard";
import SearchBar from "../components/SearchBar";
import Dashboard from "../components/dashboard";
import { Box, Text, Flex } from "@chakra-ui/react";
import HelpButton from "../components/HelpButton";

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
    <Box>
      <Text fontStyle="italic" m="4">
        Universita Libera di Livorno
      </Text>
      <UserProfile />
      <Flex direction="column" align="center" mt="4">
        <Flex wrap="wrap" justify="center" gap="4">
          <MainCard title="Courses" />
          <MainCard title="Communication" />
          <MainCard title="Grade Center" />
        </Flex>
        <SearchBar />
        <Dashboard />
      </Flex>
      <HelpButton helpText={helpText} />
    </Box>
  );
};

export default MainApp;
