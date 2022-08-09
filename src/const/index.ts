import { Player } from "types";

export const boardCols = 7;
export const boardRows = 6;

// Default values set by person creating the game
export const defaultPlayerOneName = "Red";
export const defaultPlayerTwoName = "Yellow";
export const defaultPlayerOneColor = "#f10000";
export const defaultPlayerTwoColor = "#ece100";

// Checks if values have been placed by users, if it has then use that name, else use default values
export const playerColor: Record<Player, string> = {
  1: defaultPlayerOneColor,
  2: defaultPlayerTwoColor,
};

export const playerName: Record<Player, string> = {
  1: defaultPlayerOneName,
  2: defaultPlayerTwoName,
};
