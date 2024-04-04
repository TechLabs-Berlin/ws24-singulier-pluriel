import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
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
// Import AuthApi for conditional rendering
import AuthApi from "../AuthApi";
// Import buttons
import MaterialDeleteButton from "./MaterialDeleteButton";
import DeleteModuleButton from "./DeleteModuleButton";
import EditModuleButton from "./EditModuleButton";
import AddModule from "./AddModule";
import ActionButtons from "./ActionButtons";

// Get course modules
const fetchCourseModules = async (courseId) => {
  const { data } = await axios.get(`/courses/${courseId}/modules`);
  return data;
};

// Placeholder for a generic icon for now
const genericIconUrl = "/assets/icon.jpg";

const Module = () => {
  const { courseId } = useParams();
  const { data, isLoading, error } = useQuery(
    ["courseModules", courseId],
    () => fetchCourseModules(courseId),
    { retry: false }
  );
  const [modules, setModules] = useState([]);
  const { auth } = useContext(AuthApi);

  useEffect(() => {
    if (data) setModules(data);
  }, [data]);

  // Handlers for action buttons
  //Handle delete module
  const handleModuleDeleted = (deletedModuleId) => {
    const updatedModules = modules.filter(
      (module) => module._id !== deletedModuleId
    );
    setModules(updatedModules);
  };

  //Handle edit module
  const handleModuleUpdated = (moduleId, newTitle) => {
    const updatedModules = modules.map((module) => {
      if (module._id === moduleId) {
        return { ...module, title: newTitle };
      }
      return module;
    });
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

  //Handle add module
  const handleAddModule = (newModule) => {
    setModules((prevModules) => [...prevModules, newModule]);
  };

  // User role from auth context
  const userRole = auth.loggedIn ? auth.user?.role : null;

  if (isLoading) return <CircularProgress isIndeterminate color="blue.500" />;
  if (error) return <Text>An error occurred: {error.message}</Text>;

  return (
    <VStack spacing={4} align="stretch">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Modules
        </Text>
        {userRole === "teacher" && (
          <AddModule courseId={courseId} onAddModule={handleAddModule} />
        )}
      </Flex>
      {modules.map((module) => (
        <Box key={module._id} borderWidth="1px" p={5} shadow="md">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Text fontSize="lg" fontWeight="semibold">
              {module.title}
            </Text>
            {userRole === "teacher" && (
              <HStack spacing={2}>
                <EditModuleButton
                  courseId={courseId}
                  moduleId={module._id}
                  onModuleUpdated={handleModuleUpdated}
                />
                <DeleteModuleButton
                  courseId={courseId}
                  moduleId={module._id}
                  onModuleDeleted={handleModuleDeleted}
                />
              </HStack>
            )}
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
                    {userRole === "teacher" && (
                      <MaterialDeleteButton
                        courseId={courseId}
                        moduleId={module._id}
                        materialId={material._id}
                        onMaterialDeleted={handleMaterialDeleted}
                      />
                    )}
                  </Flex>
                ))}
              </VStack>
            </Box>
            <Box flex={1} ml={4} borderWidth="1px" p={3}>
              <Text fontSize="md" mb={2}>
                Assignments
              </Text>
              {/* Demo button for now */}
              <Button size="sm" colorScheme="teal">
                Check/Edit Assignments
              </Button>
            </Box>
          </Flex>
          {/* Action buttons */}
          <Flex justifyContent="center" mt={4}>
            <ActionButtons courseId={courseId} userRole={userRole} />
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default Module;
