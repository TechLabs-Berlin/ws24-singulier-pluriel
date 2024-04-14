import { useState, useContext } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthApi from "../AuthApi";
import {
  Box,
  Button,
  Input,
  Text,
  Image,
  FormControl,
  FormLabel,
  VStack,
  Center,
  useToast,
} from "@chakra-ui/react";
import lmsLogo from "../assets/lms-logo.jpg";
import uniLogo from "../assets/uni-logo.jpg";
import bgImage from "../assets/bg-image.jpg";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const { setAuth } = useContext(AuthApi);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { mutate, isLoading } = useMutation(
    () =>
      axios.post("/auth/login", {
        // Using the proxy setup
        email: userEmail,
        password: password,
      }),
    {
      onSuccess: (response) => {
        setAuth({
          loggedIn: true,
          user: {
            ...response.data.user,
            role: response.data.user.role.name,
          },
        });
        navigate("/main"); // Redirect to main page after successful login
      },
      onError: (error) => {
        setError(error.response?.data.message || "Unable to login.");
        toast({
          title: "An error occurred.",
          description: error.response?.data.message || "Unable to login.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (!userEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }
    mutate();
  };

  return (
    <Center
      minH="100vh"
      bgImage={`url(${bgImage})`}
      bgPos="center"
      bgSize="cover"
    >
      <VStack spacing={4}>
        <Image
          src={uniLogo}
          alt="University Logo"
          boxSize={{ base: "67px", md: "135px" }}
        />
        <Box
          p={6}
          boxShadow="xl"
          rounded="lg"
          bg="#01427A"
          color="white"
          w="454px"
          textAlign="center"
        >
          <Image src={lmsLogo} alt="LMS Logo" boxSize="110px" m="auto" />
          {error && (
            <Text color="red" mb={4}>
              {error}
            </Text>
          )}
          <FormControl isRequired mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              bgColor="white"
              color="black"
            />
          </FormControl>
          <FormControl isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bgColor="white"
              color="black"
            />
          </FormControl>
          <Text
            color="gray.200"
            mb={4}
            cursor="pointer"
            _hover={{ color: "gray.300" }}
          >
            Forgot your password?
          </Text>
          <Button
            isLoading={isLoading}
            backgroundColor="#E14177"
            onClick={handleLogin}
            size="lg"
            color="black"
          >
            Log In
          </Button>
        </Box>
      </VStack>
    </Center>
  );
}

export default Login;
