import React, { useState } from "react";
import {
  Button,
  HStack,
  useToast,
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

const ActionButtons = ({ courseId, userRole }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    //Update upload logic
    try {
      await axios.post(`/courses/${courseId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "File uploaded successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error.response?.data.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {userRole === "teacher" && (
        <>
          <HStack spacing={2}>
            <Button size="sm" colorScheme="green" onClick={onOpen}>
              Upload
            </Button>
            <Button size="sm" colorScheme="purple">
              Add Link
            </Button>
            <Button size="sm" colorScheme="orange">
              Add Multimedia Resources
            </Button>
          </HStack>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={handleFileChange} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpload}>
              Upload
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {userRole === "student" && (
        <Button size="sm" colorScheme="blue" mt={4}>
          Download
        </Button>
      )}
    </>
  );
};

export default ActionButtons;
