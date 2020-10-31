import type { OsRef } from "typings/OsRef";
import type { Hash } from "typings/phantom-types/Hash";
import type { RawBinary } from "typings/RawBinary";

export type Binary = Required<RawBinary> & {
  fileHash: Hash;
  isBeingRenamed: boolean;
  ////////////////////////////////////////////////////////
  // Refs
  ////////////////////////////////////////////////////////
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickstartAreaItemRef: OsRef<HTMLElement>;
};
