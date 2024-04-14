// Deletes Module material
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

const MaterialDeleteButton = ({
  courseId,
  moduleId,
  materialId,
  onMaterialDeleted,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = async () => {
    try {
      await axios.delete(
        `/courses/${courseId}/modules/${moduleId}/${materialId}`
      );
      onClose();
      onMaterialDeleted(materialId);
    } catch (error) {
      console.error("Failed to delete material:", error);
    }
  };

  return (
    <>
      <Button
        size="xs"
        backgroundColor="#E14177"
        color="black"
        onClick={onOpen}
        _hover={{ bg: "#c12d56" }}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this material?</Text>
            <Text color="red.500">This action cannot be undone!</Text>
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

export default MaterialDeleteButton;
