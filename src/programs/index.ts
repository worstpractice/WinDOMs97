import calculator from "assets/icons/calculator-0.png";
import console_prompt from "assets/icons/console_prompt-0.png";
import game_mine from "assets/icons/game_mine_1-0.png";
import paint_file from "assets/icons/paint_file-5.png";
import type { Binary } from "typings/Binary";
import { Hash } from "typings/phantom-types/Hash";

const calc: Binary = {
  fileHash: "" as Hash,
  fileName: "" as Hash,
  icon: calculator,
  name: "Calculator",
  ////////////////////////////////////////////
  desktopItemRef: { current: null },
  startMenuItemRef: { current: null },
  quickstartAreaItemRef: { current: null },
} as const;

const cmd: Binary = {
  fileHash: "" as Hash,
  fileName: "" as Hash,
  icon: console_prompt,
  name: "Command Prompt",
  ////////////////////////////////////////////
  desktopItemRef: { current: null },
  startMenuItemRef: { current: null },
  quickstartAreaItemRef: { current: null },
} as const;

const minesweeper: Binary = {
  fileHash: "" as Hash,
  fileName: "" as Hash,
  icon: game_mine,
  name: "Minesweeper",
  ////////////////////////////////////////////
  desktopItemRef: { current: null },
  startMenuItemRef: { current: null },
  quickstartAreaItemRef: { current: null },
} as const;

const paint: Binary = {
  fileHash: "" as Hash,
  fileName: "" as Hash,
  icon: paint_file,
  name: "Paint",
  ////////////////////////////////////////////
  desktopItemRef: { current: null },
  startMenuItemRef: { current: null },
  quickstartAreaItemRef: { current: null },
} as const;

export const programs = [calc, cmd, minesweeper, paint] as const;
