import React from "react";
import { Image, Text, Flex } from "@chakra-ui/react";
import lmsLogo from "../assets/lms-logo.jpg";
import uniLogo from "../assets/uni-logo.jpg";

const LmsUniLogo = () => {
  return (
    <Flex align="center" top="11px" left="32px">
      <Image src={lmsLogo} width="87px" height="91px" alt="LMS logo" />
      <Text mx="2">for</Text>
      <Image src={uniLogo} width="137px" height="92px" alt="Uni logo" />
    </Flex>
  );
};

export default LmsUniLogo;
