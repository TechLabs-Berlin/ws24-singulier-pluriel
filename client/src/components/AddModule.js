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
import { AddIcon } from "@chakra-ui/icons";
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
      <Button
        onClick={onOpen}
        backgroundColor="transparent"
        color="#E14177"
        borderColor="#E14177"
        borderWidth="1px"
        _hover={{ bg: "#E14177", color: "black" }}
      >
        Add Module
        <AddIcon color="black" boxSize="12px" ml={2} />
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
