import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading } = useMutation(
    () =>
      axios.post("https://ws24-singulier-pluriel.onrender.com/api/auth/login", {
        email: userEmail,
        password: password,
      }),
    {
      onSuccess: (response) => {
        console.log(response.data);
        toast({
          title: "Login successful.",
          description: "You're being redirected to the main page.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/main"); // Redirect to main page
      },
      onError: (error) => {
        toast({
          title: "An error occurred.",
          description: error.response.data.message || "Unable to login.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p={4} m="40px auto">
      <form onSubmit={handleLogin}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mt={4} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={isLoading} type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
}

export default Login;
