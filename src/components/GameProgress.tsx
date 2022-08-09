import { Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameOverState, playerState, playerOne, playerTwo } from "state";

const GameProgress: FC = () => {
  const player = useRecoilValue(playerState);
  const gameOver = useRecoilValue(gameOverState);
  const playerOneDetails = useRecoilValue(playerOne);
  const playerTwoDetails = useRecoilValue(playerTwo);

  return (
    <Heading as="h3" size="lg">
      {gameOver
        ? `${player === 1 ? playerOneDetails[0] : playerTwoDetails[0]} wins!`
        : `${player === 1 ? playerOneDetails[0] : playerTwoDetails[0]}'s turn`}
    </Heading>
  );
};

export default GameProgress;
