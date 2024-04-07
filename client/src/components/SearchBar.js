import { Flex, Text, Input, useColorModeValue } from "@chakra-ui/react";

function SearchBar() {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      bg={bgColor}
      p={3}
      m={1}
      alignItems="center"
      justifyContent="space-between"
      width="55%"
    >
      <Text fontSize="md" fontWeight="bold" color={textColor} mr={3}>
        I want to / I am looking for...
      </Text>
      <Input
        placeholder="ex. Japanese B1, upload an assignment, etc."
        size="sm"
        width="65%"
        height="35px"
        focusBorderColor="blue.500"
        bgColor="white"
      />
    </Flex>
  );
}

export default SearchBar;
