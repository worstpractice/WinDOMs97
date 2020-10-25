import png_calc from "assets/icons/calculator-0.png";
import png_taskmgr from "assets/icons/computer_taskmgr-0.png";
import png_cmd from "assets/icons/console_prompt-0.png";
import png_minesweeper from "assets/icons/game_mine_1-0.png";
import png_ie from "assets/icons/msie2-2.png";
import png_notepad from "assets/icons/notepad-2.png";
import png_paint from "assets/icons/paint_file-5.png";
import { Calc } from "programs/calc/Calc";
import { Cmd } from "programs/cmd/Cmd";
import { IE } from "programs/ie/IE";
import { Minesweeper } from "programs/minesweeper/Minesweeper";
import { Notepad } from "programs/notepad/Notepad";
import { Paint } from "programs/paint/Paint";
import { TaskMgr } from "programs/taskmgr/TaskMgr";
import type { RawBinary } from "typings/RawBinary";

///////////////////////////////////////////////////////////////

const calc: RawBinary = {
  icon: png_calc,
  instructions: Calc,
  fileName: "calc.exe",
  name: "Calculator",
} as const;

const cmd: RawBinary = {
  icon: png_cmd,
  instructions: Cmd,
  fileName: "cmd.exe",
  name: "Command Prompt",
  startingDimensions: { x: 1000, y: 500 },
} as const;

const ie: RawBinary = {
  icon: png_ie,
  instructions: IE,
  fileName: "ie.exe",
  name: "Internet Exploder",
} as const;

const minesweeper: RawBinary = {
  icon: png_minesweeper,
  instructions: Minesweeper,
  fileName: "minesweeper.exe",
  name: "Minesweeper",
} as const;

const notepad: RawBinary = {
  icon: png_notepad,
  instructions: Notepad,
  fileName: "notepad.exe",
  name: "Notepad",
} as const;

const paint: RawBinary = {
  icon: png_paint,
  instructions: Paint,
  fileName: "paint.exe",
  name: "Paint",
} as const;

const taskManager: RawBinary = {
  icon: png_taskmgr,
  instructions: TaskMgr,
  fileName: "taskmgr.exe",
  name: "Task Manager",
} as const;

///////////////////////////////////////////////////////////////

export const programs = [
  // NOTE: Hi. This line stops prettier.
  calc,
  cmd,
  ie,
  minesweeper,
  notepad,
  paint,
  taskManager,
] as const;
