// Deletes Module material
import React from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const MaterialDeleteButton = ({
  courseId,
  moduleId,
  materialId,
  onMaterialDeleted,
}) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/courses/${courseId}/modules/${moduleId}/${materialId}`
      );
      console.log(response.data);
      onMaterialDeleted(materialId);
    } catch (error) {
      console.error("Failed to delete material:", error);
    }
  };

  return (
    <Button size="xs" colorScheme="red" onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default MaterialDeleteButton;
