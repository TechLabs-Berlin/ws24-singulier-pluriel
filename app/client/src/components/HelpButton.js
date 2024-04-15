import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Text,
  Box,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import HelpIcon from "../assets/help-icon.png";

const HelpButton = ({ helpText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="fixed" top={4} right={4}>
      <IconButton
        icon={<QuestionOutlineIcon />}
        onClick={onOpen}
        variant="outline"
        colorScheme="orange"
        borderColor="#E14177"
        borderWidth="1px"
        borderRadius="lg"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Image
              src={HelpIcon}
              boxSize="44px"
              mr="2"
              display="inline-block"
              verticalAlign="middle"
            />
            Help
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{helpText}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HelpButton;
