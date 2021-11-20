import png_calc from 'assets/icons/calculator-0.png';
import png_taskmgr from 'assets/icons/computer_taskmgr-0.png';
import png_cmd from 'assets/icons/console_prompt-0.png';
import png_minesweeper from 'assets/icons/game_mine_1-0.png';
import png_ie from 'assets/icons/msie2-2.png';
import png_notepad from 'assets/icons/notepad-2.png';
import png_paint from 'assets/icons/paint_file-5.png';
import { MIN_HEIGHT, MIN_WIDTH } from 'src/os-constants/OsWindow';
import { Calc } from 'src/programs/calc/Calc';
import { Cmd } from 'src/programs/cmd/Cmd';
import { IE } from 'src/programs/ie/IE';
import { Minesweeper } from 'src/programs/minesweeper/Minesweeper';
import { Notepad } from 'src/programs/notepad/Notepad';
import { Paint } from 'src/programs/paint/Paint';
import { TaskMgr } from 'src/programs/taskmgr/TaskMgr';
import { createRawBinary } from 'src/utils/type-constructors/createRawBinary';

export const programs = [
  createRawBinary({
    fileName: 'calc.exe',
    icon: png_calc,
    instructions: Calc,
    programName: 'Calculator',
  } as const),

  createRawBinary({
    fileName: 'cmd.exe',
    icon: png_cmd,
    instructions: Cmd,
    programName: 'Command Prompt',
    startingDimensions: {
      x: MIN_WIDTH + 200,
      y: MIN_HEIGHT,
    },
  } as const),

  createRawBinary({
    fileName: 'ie.exe',
    icon: png_ie,
    instructions: IE,
    programName: 'Internet Exploder',
  } as const),

  createRawBinary({
    fileName: 'minesweeper.exe',
    icon: png_minesweeper,
    instructions: Minesweeper,
    programName: 'Minesweeper',
  } as const),

  createRawBinary({
    fileName: 'notepad.exe',
    icon: png_notepad,
    instructions: Notepad,
    programName: 'Notepad',
  } as const),

  createRawBinary({
    fileName: 'paint.exe',
    icon: png_paint,
    instructions: Paint,
    programName: 'Paint',
  } as const),

  createRawBinary({
    fileName: 'taskmgr.exe',
    icon: png_taskmgr,
    instructions: TaskMgr,
    isSingleInstanceOnly: true,
    programName: 'Task Manager',
  } as const),
] as const;
