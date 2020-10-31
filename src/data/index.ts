import png_calc from "assets/icons/calculator-0.png";
import png_taskmgr from "assets/icons/computer_taskmgr-0.png";
import png_cmd from "assets/icons/console_prompt-0.png";
import png_minesweeper from "assets/icons/game_mine_1-0.png";
import png_ie from "assets/icons/msie2-2.png";
import png_notepad from "assets/icons/notepad-2.png";
import png_paint from "assets/icons/paint_file-5.png";
import { MIN_HEIGHT, MIN_WIDTH } from "os-constants/OsWindow";
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
  programName: "Calculator",
} as const;

const cmd: RawBinary = {
  icon: png_cmd,
  instructions: Cmd,
  fileName: "cmd.exe",
  programName: "Command Prompt",
  startingDimensions: { x: MIN_WIDTH + 200, y: MIN_HEIGHT },
} as const;

const ie: RawBinary = {
  icon: png_ie,
  instructions: IE,
  fileName: "ie.exe",
  programName: "Internet Exploder",
} as const;

const minesweeper: RawBinary = {
  icon: png_minesweeper,
  instructions: Minesweeper,
  fileName: "minesweeper.exe",
  programName: "Minesweeper",
} as const;

const notepad: RawBinary = {
  icon: png_notepad,
  instructions: Notepad,
  fileName: "notepad.exe",
  programName: "Notepad",
} as const;

const paint: RawBinary = {
  icon: png_paint,
  instructions: Paint,
  fileName: "paint.exe",
  programName: "Paint",
} as const;

const taskManager: RawBinary = {
  icon: png_taskmgr,
  instructions: TaskMgr,
  isSingleInstanceOnly: true,
  fileName: "taskmgr.exe",
  programName: "Task Manager",
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
