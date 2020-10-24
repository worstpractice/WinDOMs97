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

///////////////////////////////////////////////////////////////

/** For convenience. And to prevent pointer sharing badness. */
const everywhere = () => {
  const everywhere: RawBinary["softlinks"] = {
    isOnDesktop: true,
    isOnStartMenu: true,
    isInQuickstartArea: true,
  } as const;

  return everywhere;
};

///////////////////////////////////////////////////////////////

const calc: RawBinary = {
  icon: calculator,
  instructions: Calc,
  name: "Calculator",
  softlinks: everywhere(),
  startingDimensions: { x: 600, y: 500 },
} as const;

const cmd: RawBinary = {
  icon: console_prompt,
  instructions: Cmd,
  name: "Command Prompt",
  softlinks: everywhere(),
  startingDimensions: { x: 1000, y: 500 },
} as const;

const minesweeper: RawBinary = {
  icon: game_mine,
  instructions: Minesweeper,
  name: "Minesweeper",
  softlinks: everywhere(),
  startingDimensions: { x: 600, y: 500 },
} as const;

const paint: RawBinary = {
  icon: paint_file,
  instructions: Paint,
  name: "Paint",
  softlinks: everywhere(),
  startingDimensions: { x: 600, y: 500 },
} as const;

const taskManager: RawBinary = {
  icon: task_manager,
  instructions: TaskMgr,
  name: "Task Manager",
  softlinks: everywhere(),
  startingDimensions: { x: 600, y: 500 },
} as const;

const ie: RawBinary = {
  icon: internet_exploder,
  instructions: IE,
  name: "Internet Exploder",
  softlinks: everywhere(),
  startingDimensions: { x: 600, y: 500 },
} as const;

export const programs = [
  // NOTE: Hi. This line stops prettier.
  calc,
  cmd,
  minesweeper,
  paint,
  taskManager,
  ie,
] as const;
