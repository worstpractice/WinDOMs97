import type { OsRef } from "typings/OsRef";
import type { Hash } from "typings/phantom-types/Hash";
import type { Program } from "typings/Program";

export type Binary = Program & {
  fileName: string;
  fileHash: Hash;
  ////////////////////////////////////////////////////////
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickstartAreaItemRef: OsRef<HTMLElement>;
};
