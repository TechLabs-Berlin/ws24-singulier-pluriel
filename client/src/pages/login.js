import { useState, useContext } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthApi from "../AuthApi";
import {
  Box,
  Button,
  Input,
  Image,
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
    <Box
      marginTop={'8%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderWidth="1px"
        bgColor={'#01427A;'}
        boxShadow={'0px 4px 4px 0px #00000040'}
        width={'452px'}
        height={'452px'}
        top={'355px'}
        left={'587px'}
        gap={'0px'}
        borderRadius={'30px'}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin} >

          <FormControl id="email" isRequired>
            <table>
              <tr>
                <td>
        <Image src="LMS logo (Image + text)"></Image>
                </td>
              </tr>
              <tr>
                <td>
                  <FormLabel
                    color={'white'}
                    width={'104px'}
                    height={'28px'}
                    top={'205px'}
                    left={'43px'}
                    gap={'0px'}
                    opacity={'0px'}
                    fontFamily={'Inter'}
                    fontSize={'20px'}
                    fontWeight={'500'}
                    lineHeight={'28px'}
                    textAlign={'left'}
                  >
                    username</FormLabel>
                </td>
                <td>
                  <div className="inputform">
                    <Input
                      bgColor={'white'}
                      width={'244px'}
                      height={'48px'}
                      left={'16px'}
                      padding={'0px 16px 0px 16px'}
                      gap={'10px'}
                      borderRadius={'6px'}
                      borderWidth={'1px'}
                      borderColor={'#E2E8FO'}
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </td>
              </tr>
            </table>
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <table>
              <tr>
                <td>
                  <FormLabel
                    color={'white'}
                    width={'104px'}
                    height={'28px'}
                    top={'205px'}
                    left={'43px'}
                    gap={'0px'}
                    opacity={'0px'}
                    fontFamily={'Inter'}
                    fontSize={'20px'}
                    fontWeight={'500'}
                    lineHeight={'28px'}
                    textAlign={'left'}
                  >
                    Password</FormLabel>
                </td>
                <td>
                  <div className="inputform">
                    <Input
                      bgColor={'white'}
                      width={'244px'}
                      height={'48px'}
                      left={'16px'}
                      padding={'0px 16px 0px 16px'}
                      gap={'10px'}
                      borderRadius={'6px'}
                      borderWidth={'1px'}
                      borderColor={'#E2E8FO'}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />

                  </div>
                </td>
              </tr>
            </table>
          </FormControl>
          <table>
            <tr>
              <td>
                <FormLabel
                  color={'white'}
                  width={'126px'}
                  height={'28px'}
                  marginTop={'20%'}
                  top={'40px'}
                  gap={'0px'}
                  fontFamily={'Inter'}
                  fontSize={'20px'}
                  textAlign={'left'}
                >
                  Forgot your password?
                </FormLabel>
              </td>
              <td>
                <Button
                  width={'101px'}
                  height={'48px'}
                  top={'37px'}
                  left={'70px'}
                  padding={'0px 24px 0px 24px'}
                  gap={'8px'}
                  borderRadius={'6px'}
                  bgColor={'#E14177'}
                  boxShadow={'0px 4px 4px 0px #00000040'}
                >
                  Login
                </Button>
              </td>
            </tr>
          </table>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
