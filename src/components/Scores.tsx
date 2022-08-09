import { FC } from "react";
import { Stat, StatLabel, StatNumber, Flex, Heading } from "@chakra-ui/react";
import {
  playerOneScores,
  playerTwoScores,
  playerState,
  playerOne,
  playerTwo,
} from "state";
import { useRecoilValue } from "recoil";

const Scores: FC = () => {
  const player = useRecoilValue(playerState);

  // Player information from recoil
  const playerOneScore = useRecoilValue(playerOneScores);
  const playerTwoScore = useRecoilValue(playerTwoScores);
  const playerOneDetails = useRecoilValue(playerOne);
  const playerTwoDetails = useRecoilValue(playerTwo);

  return (
    <Flex
      gap="50px"
      border="5px solid"
      borderColor={player === 1 ? playerOneDetails[1] : playerTwoDetails[1]}
      display="grid"
      rowGap={-20}
      padding={3}
      borderRadius={8}
    >
      <Heading margin="0 auto">Scores:</Heading>
      <Flex gap={50} justifyContent="space-around" alignItems="center">
        <Stat mt="">
          <StatLabel fontSize={30}>{playerOneDetails[0]}</StatLabel>
          <StatNumber textAlign="center">{playerOneScore}</StatNumber>
        </Stat>
        <Stat mt="">
          <StatLabel fontSize={30}>{playerTwoDetails[0]}</StatLabel>
          <StatNumber textAlign="center">{playerTwoScore}</StatNumber>
        </Stat>
      </Flex>
    </Flex>
  );
};

export default Scores;
