import type { ObSet } from 'obset';
import type { Loader } from 'src/typings/Loader';
import type { Position } from 'src/typings/Position';
import type { Softlink } from 'src/typings/Softlink';

export type RawBinary = {
  fileName: string;
  readonly icon: string;
  readonly instructions: (this: void, props: { readonly getProcess: Loader }) => JSX.Element;
  readonly programName: string;
  ////////////////////////////////////////////////////////
  // "Registry"
  ////////////////////////////////////////////////////////
  readonly isSingleInstanceOnly?: boolean;
  readonly softlinks: ObSet<Softlink>;
  readonly startingDimensions?: Position;
};
