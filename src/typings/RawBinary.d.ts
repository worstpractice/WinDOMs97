import type { FC } from "react";
import type { OsLocations } from "typings/OsLocations";
import type { Position } from "typings/Position";
import type { ProgramProps } from "typings/ProgramProps";

export type RawBinary = {
  icon: string;
  name: string;
  instructions: FC<ProgramProps>;
  ////////////////////////////////////////////////////////
  // "Registry"
  ////////////////////////////////////////////////////////
  softlinks: readonly OsLocations[];
  startingDimensions: Position;
};
