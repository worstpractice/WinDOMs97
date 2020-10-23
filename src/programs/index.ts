import calculator from "assets/icons/calculator-0.png";
import task_manager from "assets/icons/computer_taskmgr-0.png";
import console_prompt from "assets/icons/console_prompt-0.png";
import game_mine from "assets/icons/game_mine_1-0.png";
import internet_exploder from "assets/icons/msie2-2.png";
import paint_file from "assets/icons/paint_file-5.png";
import { Calc } from "programs/calc/Calc";
import { Cmd } from "programs/cmd/Cmd";
import { IE } from "programs/ie/IE";
import { Minesweeper } from "programs/minesweeper/Minesweeper";
import { Paint } from "programs/paint/Paint";
import { TaskMgr } from "programs/taskmgr/TaskMgr";
import type { RawBinary } from "typings/RawBinary";

const calc: RawBinary = {
  icon: calculator,
  name: "Calculator",
  instructions: Calc,
} as const;

const cmd: RawBinary = {
  icon: console_prompt,
  name: "Command Prompt",
  instructions: Cmd,
} as const;

const minesweeper: RawBinary = {
  icon: game_mine,
  name: "Minesweeper",
  instructions: Minesweeper,
} as const;

const paint: RawBinary = {
  icon: paint_file,
  name: "Paint",
  instructions: Paint,
} as const;

const taskManager: RawBinary = {
  icon: task_manager,
  name: "Task Manager",
  instructions: TaskMgr,
} as const;

const ie: RawBinary = {
  icon: internet_exploder,
  name: "Internet Exploder",
  instructions: IE,
} as const;

export const programs = [calc, cmd, minesweeper, paint, taskManager, ie] as const;
