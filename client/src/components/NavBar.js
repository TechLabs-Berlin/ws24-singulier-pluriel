import { Box, Text, Image, VStack, Link, HStack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import LogoImg from "../assets/LMS-logo.png";
import UniLogo from "../assets/UNI-LOGO.png";

const NavBar = () => {
  const location = useLocation();
  const isCourseDetailPage = location.pathname.startsWith("/course-detail/");

  return (
    <Box w="20%" p={5} bg="#FFF5F5" minH="100vh">
      <Box mb={8} textAlign="center" display="flex">
        <HStack spacing={20} align="start">
          <Image
            src={LogoImg}
            alt="Logo"
            mx="auto"
            width="171px"
            height="179px"
            top="11px"
            left="32px"
            gap="10px"
            opacity="0px"
          />
          <Text
            m="4"
            position="absolute"
            width="37px"
            height="17px"
            left="198px"
            top="92px"
            font-family="Zilla Slab"
            font-style="normal"
            font-weight=" 400"
            font-size="13px"
            line-height=" 16px"
            /* or 123% */
            text-align="center"
            letter-spacing="0.5px"
            color="#000000"
            padding="5px"
            gap="240px"
          >
            For
          </Text>

          <Image
            src={UniLogo}
            mx="auto"
            width="270px"
            height="182px"
            left="244px"
            gap="0px"
            border-radius="12px 0px 0px 0px"
            opacity="0px"
          />
        </HStack>
      </Box>

      <VStack spacing={4} align="start">
        <Link as={RouterLink} to="/main">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6663 33.3333V23.3333H23.333V33.3333H31.6663V20H36.6663L19.9997 5L3.33301 20H8.33301V33.3333H16.6663Z"
              fill="black"
            />
          </svg>
          Home
        </Link>
        <Link as={RouterLink} to="/communication">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.333 6.66663H6.66634C4.83301 6.66663 3.34967 8.16663 3.34967 9.99996L3.33301 30C3.33301 31.8333 4.83301 33.3333 6.66634 33.3333H33.333C35.1663 33.3333 36.6663 31.8333 36.6663 30V9.99996C36.6663 8.16663 35.1663 6.66663 33.333 6.66663ZM33.333 13.3333L19.9997 21.6666L6.66634 13.3333V9.99996L19.9997 18.3333L33.333 9.99996V13.3333Z"
              fill="black"
            />
          </svg>
          Communications
        </Link>
        <Link as={RouterLink} to="/grade-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.333 3.33337H6.66634C4.99967 3.33337 3.33301 4.83337 3.33301 6.66671V11.6834C3.33301 12.8834 4.04967 13.9167 4.99967 14.5V33.3334C4.99967 35.1667 6.83301 36.6667 8.33301 36.6667H31.6663C33.1663 36.6667 34.9997 35.1667 34.9997 33.3334V14.5C35.9497 13.9167 36.6663 12.8834 36.6663 11.6834V6.66671C36.6663 4.83337 34.9997 3.33337 33.333 3.33337ZM24.9997 23.3334H14.9997V20H24.9997V23.3334ZM33.333 11.6667H6.66634V6.66671L33.333 6.63337V11.6667Z"
              fill="black"
            />
          </svg>
          Grade Center
        </Link>
        {/* Conditionally render the Courses link */}
        {isCourseDetailPage && (
          <Link as={RouterLink} to="/courses">
            Courses
          </Link>
        )}
      </VStack>
    </Box>
  );
};

export default NavBar;
