import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

const DeleteModuleButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    // Placeholder API call
    setTimeout(() => {
      console.log("Module deleted");
      setIsLoading(false);
      onClose(); // Close modal
    }, 1000);
  };

  return (
    <>
      <Button size="sm" colorScheme="red" onClick={onOpen}>
        Delete Module
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this module?</Text>
            <Text color="red.500">This action cannot be undone!</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleDelete}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModuleButton;
