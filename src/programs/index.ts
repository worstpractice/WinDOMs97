import calculator from "assets/icons/calculator-0.png";
import console_prompt from "assets/icons/console_prompt-0.png";
import game_mine from "assets/icons/game_mine_1-0.png";
import paint_file from "assets/icons/paint_file-5.png";
import type { Program } from "typings/Program";
import { uuidv4 } from "utils/algorithms/uuidv4";

const calc: Program = {
  guid: uuidv4(),
  icon: calculator,
  name: "Calculator",
} as const;

const cmd: Program = {
  guid: uuidv4(),
  icon: console_prompt,
  name: "Command Prompt",
} as const;

const minesweeper: Program = {
  guid: uuidv4(),
  icon: game_mine,
  name: "Minesweeper",
} as const;

const paint: Program = {
  guid: uuidv4(),
  icon: paint_file,
  name: "Paint",
} as const;

export const programs = [calc, cmd, minesweeper, paint] as const;
