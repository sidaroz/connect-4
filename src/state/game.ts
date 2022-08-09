import {
  boardCols,
  defaultPlayerOneName,
  defaultPlayerOneColor,
  defaultPlayerTwoName,
  defaultPlayerTwoColor,
} from "const";
import { atom, AtomEffect } from "recoil";
import { Board, Player } from "types";

const boardStorageKey = "Board State";
const playerStorageKey = "Player State";
const playerOneScoreKey = "PlayerOneScoreState";
const playerTwoScoreKey = "PlayerTwoScoreState";

// Local storage persistance for the Board
const localStorageEffectBoard =
  (): AtomEffect<Board> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(boardStorageKey);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(boardStorageKey)
        : localStorage.setItem(boardStorageKey, JSON.stringify(newValue));
    });
  };

// Local storage persistance for Player state (showing whos go it was)
const localStorageEffectPlayer =
  (): AtomEffect<Player> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(playerStorageKey);
    if (savedValue != null) {
      setSelf(Number(savedValue) as Player);
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(playerStorageKey)
        : localStorage.setItem(playerStorageKey, JSON.stringify(newValue));
    });
  };

// Local storage persistance score for Player 1
// This Recoil Storage effect makes tests fail for 4 out of 5, if you comment it out on line 84 it fixes it and tests pass.
// I think its due to newValue being passed as a string when it wants a Board. This local storage persistance does do its job (keeping the board the same between sessions)
const localStorageScore =
  (): AtomEffect<number> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(playerOneScoreKey);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(playerOneScoreKey)
        : // newValue (Line 61) being a string is making 4 out of 5 tests fail, I have not managed to find the reason behind this.
          localStorage.setItem(playerOneScoreKey, JSON.stringify(newValue));
    });
  };

// Local storage persistance score for Player 2
const localStorageScoreTwo =
  (): AtomEffect<number> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(playerTwoScoreKey);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(playerTwoScoreKey)
        : localStorage.setItem(playerTwoScoreKey, JSON.stringify(newValue));
    });
  };

export const boardState = atom<Board>({
  key: "boardState",
  default: Array(boardCols).fill([]),
  effects: [localStorageEffectBoard()],
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
  effects: [localStorageEffectPlayer()],
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});

// Set new atoms for Player scores (used for persistance above)
export const playerOneScores = atom<number>({
  key: "playerOneScore",
  default: 0,
  effects: [localStorageScore()],
});

export const playerTwoScores = atom<number>({
  key: "playerTwoScore",
  default: 0,
  effects: [localStorageScoreTwo()],
});

// Atoms for Player name's and color's
export const playerOne = atom<string[]>({
  key: "playerOne",
  default: [defaultPlayerOneName, defaultPlayerOneColor],
});

export const playerTwo = atom<string[]>({
  key: "playerTwo",
  default: [defaultPlayerTwoName, defaultPlayerTwoColor],
});
