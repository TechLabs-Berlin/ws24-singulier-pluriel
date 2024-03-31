import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

const AddModule = ({ courseId, onAddModule }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [moduleName, setModuleName] = useState("");

  const handleAddModule = async () => {
    try {
      const response = await axios.post(`/courses/${courseId}/modules`, {
        title: moduleName,
      });
      console.log("New module added:", response.data);
      onAddModule(response.data.newModule);
      setModuleName("");
      onClose();
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Add Module +
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Enter module name</p>
            <Input
              placeholder="Ex. Lesson 12 / Exam Prep etc."
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddModule}>
              Create Module
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddModule;
