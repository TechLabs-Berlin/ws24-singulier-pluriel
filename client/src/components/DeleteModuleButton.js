import React from "react";
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
import axios from "axios";

const DeleteModuleButton = ({ courseId, moduleId, onModuleDeleted }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      await axios.delete(`/courses/${courseId}/modules/${moduleId}`);
      onClose();
      onModuleDeleted(moduleId);
    } catch (error) {
      console.error("Failed to delete module:", error);
    }
  };

  return (
    <>
      <Button
        size="sm"
        backgroundColor="transparent"
        border="1px solid white"
        color="white"
        onClick={onOpen}
      >
        Delete Module
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this module?</Text>
            <Text color="red.500">Warning: This action cannot be undone!</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" onClick={handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModuleButton;
