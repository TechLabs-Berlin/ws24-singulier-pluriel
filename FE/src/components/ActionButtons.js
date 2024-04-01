import React from "react";
import { Button, HStack } from "@chakra-ui/react";

const ActionButtons = () => {
  return (
    <HStack spacing={2}>
      <Button size="sm" colorScheme="green">
        Upload
      </Button>
      <Button size="sm" colorScheme="purple">
        Add Link
      </Button>
      <Button size="sm" colorScheme="orange">
        Add Multimedia Resources
      </Button>
    </HStack>
  );
};

export default ActionButtons;
