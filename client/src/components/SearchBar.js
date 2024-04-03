import { Box, Text, Input, useColorModeValue } from "@chakra-ui/react";

function SearchBar() {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      p={3}
      m={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text fontSize="md" fontWeight="bold" color={textColor} mb={3}>
        {" "}
        I want to / I am looking for...
      </Text>
      <Input
        placeholder="ex. Japanese B1, upload an assignment, etc."
        size="sm"
        width="80%"
        focusBorderColor="blue.500"
      />
    </Box>
  );
}

export default SearchBar;
