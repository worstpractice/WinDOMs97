import type { FC } from 'react';
import type { Position } from 'src/typings/Position';
import type { ProgramProps } from 'src/typings/ProgramProps';
import type { Softlinks } from 'src/typings/Softlinks';

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
