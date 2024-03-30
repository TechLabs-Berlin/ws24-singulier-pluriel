import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  CircularProgress,
  Link,
  Image,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
//Import buttons
import MaterialDeleteButton from "./MaterialDeleteButton";
import DeleteModuleButton from "./DeleteModuleButton";
import EditModuleButton from "./EditModuleButton";

// Hardcoded course ID for testing only
const courseId = "6605898db6a2fc1cae5f6e18";

//Get course modules
const fetchCourseModules = async () => {
  const { data } = await axios.get(`/courses/${courseId}/modules`);
  return data;
};

// Placeholder for a generic icon for now
const genericIconUrl = "/assets/icon.jpg";

const Module = () => {
  const { data, isLoading, error } = useQuery(
    ["courseModules", courseId],
    fetchCourseModules,
    { retry: false }
  );
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (data) setModules(data);
  }, [data]);

  //Handle delete module
  const handleModuleDeleted = (deletedModuleId) => {
    const updatedModules = modules.filter(
      (module) => module._id !== deletedModuleId
    );
    setModules(updatedModules);
  };

  //Handle delete course materials
  const handleMaterialDeleted = (moduleId, materialId) => {
    const updatedModules = modules.map((module) => {
      if (module._id === moduleId) {
        return {
          ...module,
          materials: module.materials.filter(
            (material) => material._id !== materialId
          ),
        };
      }
      return module;
    });
    setModules(updatedModules);
  };

  if (isLoading) return <CircularProgress isIndeterminate color="blue.500" />;
  if (error) return <Text>An error occurred: {error.message}</Text>;

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Modules
      </Text>
      {modules?.map((module) => (
        <Box key={module._id} borderWidth="1px" p={5} shadow="md">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="semibold">
              {module.title}
            </Text>
            <HStack spacing={2}>
              <EditModuleButton />
              <DeleteModuleButton
                courseId={courseId}
                moduleId={module._id}
                onModuleDeleted={handleModuleDeleted}
              />
            </HStack>
          </Flex>
          <Flex>
            <Box flex={3} pr={4}>
              <VStack spacing={2}>
                {module.materials.map((material, index) => (
                  <Flex
                    key={index}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Link href={material.url} isExternal>
                      <HStack spacing={2}>
                        <Image
                          src={
                            material.type === "image"
                              ? material.url
                              : genericIconUrl
                          }
                          boxSize="50px"
                          objectFit="cover"
                        />
                        <Text isTruncated>View Material</Text>
                      </HStack>
                    </Link>
                    <MaterialDeleteButton
                      courseId={courseId}
                      moduleId={module._id}
                      materialId={material._id}
                      onMaterialDeleted={() =>
                        handleMaterialDeleted(module._id, material._id)
                      }
                    />
                  </Flex>
                ))}
              </VStack>
            </Box>
            <Box flex={1} ml={4} borderWidth="1px" p={3}>
              <Text fontSize="md" mb={2}>
                Assignments
              </Text>
              {/* Placeholder button for now */}
              <Button size="sm" colorScheme="teal">
                Check/Edit Assignments
              </Button>
            </Box>
          </Flex>
          <Flex justifyContent="center" mt={4} gap={2}>
            {/* Placeholder buttons for now */}
            <Button size="sm" colorScheme="green">
              Upload
            </Button>
            <Button size="sm" colorScheme="purple">
              Add link
            </Button>
            <Button size="sm" colorScheme="orange">
              Add Multimedia Resources
            </Button>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default Module;
