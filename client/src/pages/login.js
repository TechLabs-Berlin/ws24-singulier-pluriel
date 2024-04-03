import { useState, useContext } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthApi from "../AuthApi";
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
        toast({
          title: "Login successful.",
          description: "You're being redirected to the main page.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/main"); // Redirect to main page after successful login
      },
      onError: (error) => {
        setError(error.response?.data.message || "Unable to login.");
        toast({
          title: "An error occurred.",
          description: error.response?.data.message || "Unable to login.",
          status: "error",
          duration: 9000,
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
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p={4} m="40px auto">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
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
