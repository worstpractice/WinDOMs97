import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import type { MenuState } from "typings/MenuState";
import type { OsRef } from "typings/OsRef";
import type { PID } from "typings/phantom-types/PID";
import type { Position } from "typings/Position";
import type { Process } from "typings/Process";

export type Kernel = {
  ////////////////////////////////////////////////////////////////
  // Not Collections
  ////////////////////////////////////////////////////////////////
  activeRef: OsRef<HTMLElement>;
  isRunningAreaFull: boolean;
  lastClickPosition: Position;
  openMenu: MenuState;
  isBsod: boolean;
  bsodError: string;
  bsodMessage: string;
  ////////////////////////////////////////////////////////////////
  // Collections
  ////////////////////////////////////////////////////////////////
  alternatives: readonly Alternative[];
  availablePids: readonly PID[];
  installedPrograms: readonly Binary[];
  runningProcesses: readonly Process[];
};
