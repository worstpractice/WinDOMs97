import type { OsRef } from "typings/OsRef";
import type { Hash } from "typings/phantom-types/Hash";
import type { Position } from "typings/Position";
import type { RawBinary } from "typings/RawBinary";
import type { Softlinks } from "typings/Softlinks";

export type Binary = RawBinary & {
  fileHash: Hash;
  ////////////////////////////////////////////////////////
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickstartAreaItemRef: OsRef<HTMLElement>;
  ////////////////////////////////////////////////////////
  // "Registry"
  ////////////////////////////////////////////////////////
  softlinks: Softlinks;
  startingDimensions: Position;
  isSingleInstanceOnly: boolean;
};
