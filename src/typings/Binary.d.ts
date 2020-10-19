import type { OsRef } from "typings/OsRef";
import type { Program } from "typings/Program";

export type Binary = Program & {
  fileName: string;
  ////////////////////////////////////////////////////////
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickstartAreaItemRef: OsRef<HTMLElement>;
};
