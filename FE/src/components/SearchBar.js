import { Box, Text, Input, useColorModeValue } from "@chakra-ui/react";

function SearchBar() {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      p={4}
      m={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
        I want to / I am looking for...
      </Text>
      <Input
        placeholder="ex. Japanese B1, upload an assignment, etc."
        size="md"
        width="50%"
        focusBorderColor="blue.500"
      />
    </Box>
  );
}

export default SearchBar;
