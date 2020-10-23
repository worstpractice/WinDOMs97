import calculator from "assets/icons/calculator-0.png";
import task_manager from "assets/icons/computer_taskmgr-0.png";
import console_prompt from "assets/icons/console_prompt-0.png";
import game_mine from "assets/icons/game_mine_1-0.png";
import internet_exploder from "assets/icons/msie2-2.png";
import paint_file from "assets/icons/paint_file-5.png";
import type { Binary } from "typings/Binary";
import type { RawBinary } from "typings/RawBinary";

const calc: RawBinary = {
  icon: calculator,
  name: "Calculator",
} as const;

const cmd: RawBinary = {
  icon: console_prompt,
  name: "Command Prompt",
} as const;

const minesweeper: RawBinary = {
  icon: game_mine,
  name: "Minesweeper",
} as const;

const paint: RawBinary = {
  icon: paint_file,
  name: "Paint",
} as const;

const taskManager: RawBinary = {
  icon: task_manager,
  name: "Task Manager",
} as const;

const ie: RawBinary = {
  icon: internet_exploder,
  name: "Internet Exploder",
} as const;

export const programs = [calc, cmd, minesweeper, paint, taskManager, ie] as const;
