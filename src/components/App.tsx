import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import Board from "components/Board";
import GameControls from "components/GameControls";
import GameProgress from "components/GameProgress";
import Scores from "./Scores";
import { FC } from "react";
import { RecoilRoot } from "recoil";
import Settings from "./Settings";

const App: FC = () => (
  <ChakraProvider>
    <RecoilRoot>
      <Container
        py={5}
        as={VStack}
        bgGradient="linear(to-b, white, gray.300)"
        width="100%"
        height="100%"
      >
        <Settings />
        <Board />
        <GameProgress />
        <GameControls />
        <Scores />
      </Container>
    </RecoilRoot>
  </ChakraProvider>
);

export default App;
