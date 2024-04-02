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

const ActionButtons = ({ courseId }) => {
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
    formData.append("files", selectedFile);

    try {
      const response = await axios.post(
        `/courses/${courseId}/modules`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "File uploaded successfully",
        description: `Uploaded: ${response.data.message}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();

      // To change that newly added on top?
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
    </>
  );
};

export default ActionButtons;
