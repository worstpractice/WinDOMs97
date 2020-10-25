import type { FC } from "react";
import type { Position } from "typings/Position";
import type { ProgramProps } from "typings/ProgramProps";

export type RawBinary = {
  icon: string;
  name: string;
  fileName: string;
  instructions: FC<ProgramProps>;
  ////////////////////////////////////////////////////////
  // "Registry"
  ////////////////////////////////////////////////////////
  softlinks?: {
    isOnDesktop: boolean;
    isOnStartMenu: boolean;
    isInQuickstartArea: boolean;
  };
  startingDimensions?: Position;
};
