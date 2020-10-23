import type { OsRef } from "typings/OsRef";
import type { Hash } from "typings/phantom-types/Hash";

export type Binary = {
  icon: string;
  name: string;
  fileName: string;
  fileHash: Hash;
  ////////////////////////////////////////////////////////
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickstartAreaItemRef: OsRef<HTMLElement>;
};
