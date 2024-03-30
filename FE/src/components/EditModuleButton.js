import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditModuleButton = ({ courseId, moduleId, onModuleUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const toast = useToast();

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", title);
    try {
      const response = await axios.put(
        `/courses/${courseId}/modules/${moduleId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      toast({
        title: "Module updated.",
        description: "The module title has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onModuleUpdated(moduleId, title);
      onClose();
    } catch (error) {
      console.error("Failed to update module:", error);
      toast({
        title: "Failed to update module.",
        description: "An error occurred while updating the module title.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button size="sm" colorScheme="blue" onClick={onOpen}>
        Edit Module
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Module Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new module title"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModuleButton;
