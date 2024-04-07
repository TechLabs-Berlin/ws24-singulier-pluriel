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

const ActionButtons = ({ courseId, moduleId, userRole, materials }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const downloadFiles = () => {
    materials.forEach((material) => {
      if (material.type === "file") {
        const link = document.createElement("a");
        link.href = material.url;
        link.setAttribute("download", material.filename || "download");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };

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

    //Update upload logic
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
      toast({
        title: "File uploaded successfully",
        description: "The file has been added to the module.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
      return response.data;
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error.response?.data.message || "An error occurred during upload.",
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
        <Button size="sm" colorScheme="blue" mt={4} onClick={downloadFiles}>
          Download
        </Button>
      )}
    </>
  );
};

export default ActionButtons;
