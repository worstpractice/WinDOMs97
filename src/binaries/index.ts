import calculator from "assets/icons/calculator-0.png";
import console_prompt from "assets/icons/console_prompt-0.png";
import game_mine from "assets/icons/game_mine_1-0.png";
import paint_file from "assets/icons/paint_file-5.png";
import type { Binary } from "typings/Binary";

const calc: Binary = {
  fileName: "calc.exe",
  icon: calculator,
  name: "Calculator",
} as const;

const cmd: Binary = {
  fileName: "cmd.exe",
  icon: console_prompt,
  name: "Command Prompt",
} as const;

const minesweeper: Binary = {
  fileName: "minesweeper.exe",
  icon: game_mine,
  name: "Minesweeper",
} as const;

const paint: Binary = {
  fileName: "paint.exe",
  icon: paint_file,
  name: "Paint",
} as const;

export const programs = [calc, cmd, minesweeper, paint] as const;
