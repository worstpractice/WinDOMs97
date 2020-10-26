import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import type { OsRef } from "typings/OsRef";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";
import type { RawBinary } from "typings/RawBinary";

export type SysCalls = {
  ////////////////////////////////////////////////////////////////
  // Window
  ////////////////////////////////////////////////////////////////
  maximize: (process: Process) => void;
  minimize: (process: Process) => void;
  unMaximize: (process: Process) => void;
  unMinimize: (process: Process) => void;
  ////////////////////////////////////////////////////////////////
  // Menu
  ////////////////////////////////////////////////////////////////
  closeMenus: () => void;
  openContextMenu: (alternatives: readonly Alternative[]) => void;
  toggleStartMenu: () => void;
  ////////////////////////////////////////////////////////////////
  // Ui
  ////////////////////////////////////////////////////////////////
  activate: <T extends OsRef<HTMLElement>>(to: T) => void;
  setLastClickPosition: (to: Position) => void;
  setIsRunningAreaFull: (to: boolean) => void;
  ////////////////////////////////////////////////////////////////
  // Control
  ////////////////////////////////////////////////////////////////
  endProcess: (process: Process) => void;
  executeBinary: (binary: Binary) => void;
  installProgram: (rawBinary: RawBinary) => void;
  uninstallProgram: (binary: Binary) => void;
  ////////////////////////////////////////////////////////////////
  // Debug
  ////////////////////////////////////////////////////////////////
  bluescreen: (error: string, message: string) => void;
};
