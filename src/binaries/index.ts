/* eslint-disable @typescript-eslint/no-unused-vars */
import icon_cdRomDrive from "assets/icons/calculator-0.png";
import icon_mine from "assets/icons/game_mine_1-0.png";
import icon_paint from "assets/icons/paint_file-5.png";
import type { Binary } from "typings/Binary";

const calc: Binary = {
  fileName: "calc.exe",
  icon: icon_cdRomDrive,
  name: "Calculator",
} as const;

const minesweeper: Binary = {
  fileName: "minesweeper.exe",
  icon: icon_mine,
  name: "Minesweeper",
} as const;

const paint: Binary = {
  fileName: "paint.exe",
  icon: icon_paint,
  name: "Paint",
} as const;

export const programs = [paint] as const;
