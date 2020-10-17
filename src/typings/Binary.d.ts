import type { OsRef } from "typings/OsRef";
import type { Program } from "typings/Program";

export type Binary = Program & {
  fileName: string;
  ////////////////////////////////////////////////////////
  contextMenuItemRef: OsRef<HTMLElement>;
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickStartItemRef: OsRef<HTMLElement>;
};
