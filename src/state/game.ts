import { atom } from "recoil";
import { Board, Player } from "types";

export const boardState = atom<Board>({
  key: "boardState",
  default: [[], [], [], [], [], [], []],
});

export const playerState = atom<Player>({
  key: "playerState",
  default: 1,
});

export const gameOverState = atom<boolean>({
  key: "gameOverState",
  default: false,
});
