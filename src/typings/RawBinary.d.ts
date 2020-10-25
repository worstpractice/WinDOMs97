import type { FC } from "react";
import type { Position } from "typings/Position";
import type { ProgramProps } from "typings/ProgramProps";
import type { Softlinks } from "typings/Softlinks";

export type RawBinary = {
  icon: string;
  name: string;
  fileName: string;
  instructions: FC<ProgramProps>;
  ////////////////////////////////////////////////////////
  // "Registry"
  ////////////////////////////////////////////////////////
  softlinks?: Softlinks;
  startingDimensions?: Position;
  isSingleInstanceOnly?: boolean;
};
