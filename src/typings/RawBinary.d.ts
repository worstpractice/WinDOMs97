import type { FC } from "react";
import type { Position } from "typings/Position";
import type { ProgramProps } from "typings/ProgramProps";
import type { Softlinks } from "typings/Softlinks";

export type RawBinary = {
  fileName: string;
  icon: string;
  instructions: FC<ProgramProps>;
  programName: string;
  ////////////////////////////////////////////////////////
  // "Registry"
  ////////////////////////////////////////////////////////
  isSingleInstanceOnly?: boolean;
  softlinks?: Softlinks;
  startingDimensions?: Position;
};
