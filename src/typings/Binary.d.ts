import type { FC } from "typings/FC";
import type { OsRef } from "typings/OsRef";
import type { Hash } from "typings/phantom-types/Hash";
import type { ProgramProps } from "typings/ProgramProps";

export type Binary = {
  icon: string;
  name: string;
  fileName: string;
  fileHash: Hash;
  instructions: FC<ProgramProps>;
  ////////////////////////////////////////////////////////
  desktopItemRef: OsRef<HTMLElement>;
  startMenuItemRef: OsRef<HTMLElement>;
  quickstartAreaItemRef: OsRef<HTMLElement>;
};
