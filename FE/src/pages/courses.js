import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  List,
  ListItem,
  Image,
  Flex,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const Courses = () => {
  return (
    <Flex>
      <NavBar />
      <Box as="main" p={5} w="80%">
        <VStack spacing={4} align="stretch">
          <HStack justifyContent="space-between">
            <Button colorScheme="teal" variant="outline">
              Switch to student view
            </Button>
            <Button
              size="lg"
              height="48px"
              width="200px"
              border="2px"
              borderColor="gray.500"
            >
              Courses
            </Button>
          </HStack>
          <Box as="section">
            <Text fontSize="2xl" mb={4}>
              Current semesters
            </Text>
            <List spacing={3}>
              <ListItem display="flex" alignItems="center">
                <Image
                  src="http://via.placeholder.com/30x30"
                  borderRadius="full"
                  mr={4}
                  alt="Course 1"
                />
                <Text
                  as={RouterLink}
                  to="/course-detail/course1"
                  cursor="pointer"
                >
                  Course 1
                </Text>
              </ListItem>
              {/* Course1 is clickable just for test */}
              <ListItem display="flex" alignItems="center">
                <Image
                  src="http://via.placeholder.com/30x30"
                  borderRadius="full"
                  mr={4}
                  alt="Course 2"
                />
                <Text>Course 2</Text>
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <Image
                  src="http://via.placeholder.com/30x30"
                  borderRadius="full"
                  mr={4}
                  alt="Course 3"
                />
                <Text>Course 3</Text>
              </ListItem>
            </List>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Courses;
