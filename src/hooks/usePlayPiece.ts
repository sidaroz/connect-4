import { boardRows } from "const";
import { useRecoilState } from "recoil";
import {
  boardState,
  gameOverState,
  playerState,
  playerOneScores,
  playerTwoScores,
} from "state";
import { Player } from "types";

const testWin = (arr: number[]): boolean => /1{4}|2{4}/.test(arr.join(""));

const usePlayPiece = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [player, setPlayerTurn] = useRecoilState(playerState);
  const [gameOver, setGameOver] = useRecoilState(gameOverState);
  const [playerOneScoreAmount, setPlayerOneScoreAmount] =
    useRecoilState(playerOneScores);
  const [playerTwoScoreAmount, setPlayerTwoScoreAmount] =
    useRecoilState(playerTwoScores);

  return (col: number) => {
    // Prevent adding a piece when the game is over
    if (gameOver) {
      return;
    }

    // Prevent adding a piece when the column is full
    if (board[col].length === boardRows) {
      return;
    }

    // Play piece (non mutating)
    const newBoard = board.map((column, i) =>
      i === col ? [...column, player] : column
    );

    const row = newBoard[col].length - 1;

    const diagWinCheck = () => {
      // starts off with empty array to be filled
      const winningArrays = [];
      // Loops through conditions required to get all diagonals in a traditional connect 4 game
      // Could change values into variables so they are dynamic with columns/rows
      for (let i: number = -3; i <= 8; i++) {
        // This condition satisfies upwards to the right diagonal
        if (-3 <= i && i <= 2) {
          // Places the diagonal arrays into "arraysOne & arraysTwo" and pushes that into winningArrays
          const arrays: Player[] = newBoard.map((col, r) => col[r + i] || 0);
          winningArrays.push(arrays);
          // This condition satisfies downward to the right diagonal
        } else if (i >= 3 && i <= 8) {
          const arraysTwo: Player[] = newBoard.map((col, r) => col[i - r] || 0);
          winningArrays.push(arraysTwo);
        }
      }
      // flat is used on winningArrays because it is an array filled with all possible DIAGONAL winning combinations
      return testWin(winningArrays.flat());
    };

    if (
      testWin(newBoard[col]) || // Did win vertically
      testWin(newBoard.map((col) => col[row] || 0)) || // Did win horizontally
      // TODO Did win diagonally
      diagWinCheck()

      // FIXME This below is hardcoded and not best method
      // newBoard.map((col) => col) gives an Array of board state at that moment.
      // when mapping through, the variable r is the index of the row (including the piece hovering the board)
      //
      // testWin(newBoard.map((col, r) => col[r] || 0)) ||
      // testWin(newBoard.map((col, r) => col[r + 1] || 0)) ||
      // testWin(newBoard.map((col, r) => col[r + 2] || 0)) ||
      // testWin(newBoard.map((col, r) => col[r - 1] || 0)) ||
      // testWin(newBoard.map((col, r) => col[r - 2] || 0)) ||
      // testWin(newBoard.map((col, r) => col[r - 3] || 0)) ||
      // testWin(newBoard.map((col, r) => col[3 - r] || 0)) ||
      // testWin(newBoard.map((col, r) => col[4 - r] || 0)) ||
      // testWin(newBoard.map((col, r) => col[5 - r] || 0)) ||
      // testWin(newBoard.map((col, r) => col[6 - r] || 0)) ||
      // testWin(newBoard.map((col, r) => col[7 - r] || 0)) ||
      // testWin(newBoard.map((col, r) => col[8 - r] || 0))
    ) {
      setGameOver(true);
      player === 1
        ? setPlayerOneScoreAmount((score) => (score += 1))
        : setPlayerTwoScoreAmount((score) => (score += 1));
    } else {
      setPlayerTurn(player === 1 ? 2 : 1);
    }

    setBoard(newBoard);
  };
};

export default usePlayPiece;
