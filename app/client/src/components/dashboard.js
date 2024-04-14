import { Box, Text, VStack, Center } from "@chakra-ui/react";

function Dashboard() {
  return (
    <VStack spacing={4} m={2} align="stretch">
      <Center>
        <Text fontSize="xl" fontWeight="bold" color="black" mb={2}>
          Latest announcements
        </Text>
      </Center>
      <Center>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          w="33%"
          bg="#AFAFAF"
          color="black"
          textAlign="left"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            End of Semester
          </Text>
          <Text fontSize="sm">
            Posted on: Tuesday, March 3, 2024 12:58 CET <br />
            Posted by: Nando Rodolfi
            <br />
            <br />
            Dear esteemed teachers,
            <br />
            As we enter the final month of the semester, let's go over some
            dates and deadlines.
            <br />
            General points:
            <br />
            - Please forward the exam templates to your reference teachers for
            feedback no later than 1 week before the exam.
            <br />
            - Once you received the GO! from your reference teachers for the
            exam templates, please make sure to have them printed and ready
            sufficiently early before the exam. Keep in mind that it will be a
            busy time just before the exams.
            <br />
            - Please reference the exam invigilation guidelines you received
            from Ms. Fabiani via e-mail on 22.02.2024
            <br />
            - There is no strict deadline for returning the corrected exam
            papers, but I would appreciate it if you would return the exams to
            me no later than mid May.
            <br />
            <br />
            Thank you so much for another great semester!
            <br />
            Nando Rodolfi
          </Text>
        </Box>
      </Center>
    </VStack>
  );
}

export default Dashboard;
