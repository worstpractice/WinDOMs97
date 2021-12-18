import png_calc from 'assets/icons/calculator-0.png';
import png_taskmgr from 'assets/icons/computer_taskmgr-0.png';
import png_cmd from 'assets/icons/console_prompt-0.png';
import png_minesweeper from 'assets/icons/game_mine_1-0.png';
import png_ie from 'assets/icons/msie2-2.png';
import png_notepad from 'assets/icons/notepad-2.png';
import png_paint from 'assets/icons/paint_file-5.png';
import { ObSet } from 'obset';
import { MIN_HEIGHT, MIN_WIDTH } from 'src/constants/OsWindow';
import { Calc } from 'src/programs/calc/Calc';
import { Cmd } from 'src/programs/cmd/Cmd';
import { Ie } from 'src/programs/ie/Ie';
import { Minesweeper } from 'src/programs/minesweeper/Minesweeper';
import { Notepad } from 'src/programs/notepad/Notepad';
import { Paint } from 'src/programs/paint/Paint';
import { TaskMgr } from 'src/programs/taskmgr/TaskMgr';
import type { Softlink } from 'src/typings/Softlink';
import { createRawBinary } from 'src/utils/type-constructors/createRawBinary';

export const binaries = [
  createRawBinary({
    fileName: 'calc.exe',
    icon: png_calc,
    instructions: Calc,
    programName: 'Calculator',
    softlinks: new ObSet<Softlink>() //
      .on('add', (value, operation) => console.log(`calc.exe: ${operation} ${value}`))
      .on('delete', (value, operation) => console.log(`calc.exe: ${operation} ${value}`))
      .on('empty', (value, operation) => console.log(`calc.exe: ${operation} ${value}`))
      .on('full', (value, operation) => console.log(`calc.exe: ${operation} ${value}`))
      .add('desktop')
      .add('quickstartarea')
      .add('startmenu'),
  } as const),

  createRawBinary({
    fileName: 'cmd.exe',
    icon: png_cmd,
    instructions: Cmd,
    programName: 'Command Prompt',
    softlinks: new ObSet<Softlink>() //
      .on('add', (value, operation) => console.log(`cmd.exe: ${operation} ${value}`))
      .on('delete', (value, operation) => console.log(`cmd.exe: ${operation} ${value}`))
      .on('empty', (value, operation) => console.log(`cmd.exe: ${operation} ${value}`))
      .on('full', (value, operation) => console.log(`cmd.exe: ${operation} ${value}`))
      .add('desktop')
      .add('quickstartarea')
      .add('startmenu'),
    startingDimensions: {
      x: MIN_WIDTH + 200,
      y: MIN_HEIGHT,
    },
  } as const),

  createRawBinary({
    fileName: 'ie.exe',
    icon: png_ie,
    instructions: Ie,
    programName: 'Internet Exploder',
    softlinks: new ObSet<Softlink>() //
      .on('add', (value, operation) => console.log(`ie.exe: ${operation} ${value}`))
      .on('delete', (value, operation) => console.log(`ie.exe: ${operation} ${value}`))
      .on('empty', (value, operation) => console.log(`ie.exe: ${operation} ${value}`))
      .on('full', (value, operation) => console.log(`ie.exe: ${operation} ${value}`))
      .add('desktop')
      .add('quickstartarea')
      .add('startmenu'),
  } as const),

  createRawBinary({
    fileName: 'minesweeper.exe',
    icon: png_minesweeper,
    instructions: Minesweeper,
    programName: 'Minesweeper',
    softlinks: new ObSet<Softlink>() //
      .on('add', (value, operation) => console.log(`minesweeper.exe: ${operation} ${value}`))
      .on('delete', (value, operation) => console.log(`minesweeper.exe: ${operation} ${value}`))
      .on('empty', (value, operation) => console.log(`minesweeper.exe: ${operation} ${value}`))
      .on('full', (value, operation) => console.log(`minesweeper.exe: ${operation} ${value}`))
      .add('desktop')
      .add('quickstartarea')
      .add('startmenu'),
  } as const),

  createRawBinary({
    fileName: 'notepad.exe',
    icon: png_notepad,
    instructions: Notepad,
    programName: 'Notepad',
    softlinks: new ObSet<Softlink>() //
      .on('add', (value, operation) => console.log(`notepad.exe: ${operation} ${value}`))
      .on('delete', (value, operation) => console.log(`notepad.exe: ${operation} ${value}`))
      .on('empty', (value, operation) => console.log(`notepad.exe: ${operation} ${value}`))
      .on('full', (value, operation) => console.log(`notepad.exe: ${operation} ${value}`))
      .add('desktop')
      .add('quickstartarea')
      .add('startmenu'),
  } as const),

  createRawBinary({
    fileName: 'paint.exe',
    icon: png_paint,
    instructions: Paint,
    programName: 'Paint',
    softlinks: new ObSet<Softlink>() //
      .on('add', (value, operation) => console.log(`paint.exe: ${operation} ${value}`))
      .on('delete', (value, operation) => console.log(`paint.exe: ${operation} ${value}`))
      .on('empty', (value, operation) => console.log(`paint.exe: ${operation} ${value}`))
      .on('full', (value, operation) => console.log(`paint.exe: ${operation} ${value}`))
      .add('desktop')
      .add('quickstartarea')
      .add('startmenu'),
  } as const),

  createRawBinary({
    fileName: 'taskmgr.exe',
    icon: png_taskmgr,
    instructions: TaskMgr,
    isSingleInstanceOnly: true,
    programName: 'Task Manager',
    softlinks: new ObSet<Softlink>() //
      .on('add', (value, operation) => console.log(`taskmgr.exe: ${operation} ${value}`))
      .on('delete', (value, operation) => console.log(`taskmgr.exe: ${operation} ${value}`))
      .on('empty', (value, operation) => console.log(`taskmgr.exe: ${operation} ${value}`))
      .on('full', (value, operation) => console.log(`taskmgr.exe: ${operation} ${value}`))
      .add('desktop')
      .add('quickstartarea')
      .add('startmenu'),
  } as const),
] as const;
