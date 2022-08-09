import React, { FC, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  Input,
  Grid,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { playerOne, playerTwo } from "state";

const Settings: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [playerOneDetails, setPlayerOneDetails] = useRecoilState(playerOne);
  const [playerTwoDetails, setPlayerTwoDetails] = useRecoilState(playerTwo);

  // Setting default values of player colours & names
  const [playerOneName, setPlayerOneName] = useState(playerOneDetails[0]);
  const [playerTwoName, setPlayerTwoName] = useState(playerTwoDetails[0]);
  const [playerOneColour, setPlayerOneColour] = useState(playerOneDetails[1]);
  const [playerTwoColour, setPlayerTwoColour] = useState(playerTwoDetails[1]);

  // Default button functionality
  const defaults = () => {
    setPlayerOneName("Red");
    setPlayerOneColour("#f10000");
    setPlayerTwoName("Yellow");
    setPlayerTwoColour("#ece100");
  };

  // Handles the save button
  const saveAndClose = () => {
    setPlayerOneDetails([playerOneName, playerOneColour]);
    setPlayerTwoDetails([playerTwoName, playerTwoColour]);

    // My Previous method which used localstorage and window refreshing, now using state so dont need to reload page
    // localStorage.setItem("playerOneName", playerOneName);
    // localStorage.setItem("playerTwoName", playerTwoName);
    // localStorage.setItem("playerOneColor", playerOneColour);
    // localStorage.setItem("playerTwoColor", playerTwoColour);

    onClose();

    // FIXME this is a quick fix solution, I used window.location.reload as the localstorage was not being updated that same render. Will try use recoil.
    // window.location.reload();
  };

  return (
    <>
      <Button colorScheme="blackAlpha" variant="outline" onClick={onOpen}>
        Game Settings
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent w="80%">
          <ModalHeader margin="0 auto">Edit Player Name and Colour</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateRows="1fr 1fr" gap={3}>
              <Box w="100%" h="125px" bg="">
                <Flex direction="column">
                  <Heading as="h2" size="md" margin=" 0 auto">
                    Player 1:
                  </Heading>
                  <Input
                    placeholder="Name"
                    borderColor={playerOneColour ? playerOneColour : "red.200"}
                    focusBorderColor={
                      playerOneColour ? playerOneColour : "red.300"
                    }
                    value={playerOneName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPlayerOneName(event.target.value)
                    }
                    size="sm"
                    margin="0 auto"
                    mt="5px"
                    width="70%"
                  />
                  <Input
                    placeholder="Colour (Either use hex values or actual colours)"
                    value={playerOneColour}
                    borderColor={playerOneColour ? playerOneColour : "red.200"}
                    focusBorderColor={
                      playerOneColour ? playerOneColour : "red.300"
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setPlayerOneColour(event.target.value);
                    }}
                    size="sm"
                    margin="0 auto"
                    mt="5px"
                    width="70%"
                  />
                </Flex>
              </Box>
              <Box w="100%" h="125px" bg="">
                {" "}
                <Flex direction="column">
                  <Heading as="h2" size="md" margin=" 0 auto">
                    Player 2:
                  </Heading>
                  <Input
                    placeholder="Name"
                    value={playerTwoName}
                    borderColor={
                      playerTwoColour ? playerTwoColour : "yellow.200"
                    }
                    focusBorderColor={
                      playerTwoColour ? playerTwoColour : "yellow.300"
                    }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPlayerTwoName(event.target.value)
                    }
                    size="sm"
                    margin="0 auto"
                    mt="5px"
                    width="70%"
                  />
                  <Input
                    placeholder="Colour (Either use hex values or actual colours)"
                    borderColor={
                      playerTwoColour ? playerTwoColour : "yellow.200"
                    }
                    focusBorderColor={
                      playerTwoColour ? playerTwoColour : "yellow.300"
                    }
                    value={playerTwoColour}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPlayerTwoColour(event.target.value)
                    }
                    size="sm"
                    margin="0 auto"
                    mt="5px"
                    width="70%"
                  />
                </Flex>
              </Box>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={defaults}>
              Defaults
            </Button>
            <Button colorScheme="blue" onClick={saveAndClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;
