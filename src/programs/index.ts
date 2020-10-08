import cdRomDrive from "assets/icons/calculator-0.png";
import mine from "assets/icons/game_mine_1-0.png";
import type { Binary } from "typings/Binary";

const calc: Binary = {
  fileName: "calc.exe",
  icon: cdRomDrive,
  name: "Calculator",
} as const;

const minesweeper: Binary = {
  fileName: "minesweeper.exe",
  icon: mine,
  name: "Minesweeper",
} as const;

export const programs = [calc, minesweeper] as const;
