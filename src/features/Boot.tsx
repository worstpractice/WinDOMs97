import { default as React } from 'react';
import { Bsod } from 'src/features/Bsod';
import { Explorer } from 'src/features/Explorer';
import { useLastClickPosition } from 'src/hooks/useLastClickPosition';
import { useLastKeyPress } from 'src/hooks/useLastKeyPress';
import { binaries } from 'src/programs/binaries';
import { useErrorState } from 'src/state/useErrorState';
import { useKernelState } from 'src/state/useKernelState';
import type { ErrorState } from 'src/typings/state/ErrorState';
import type { KernelState } from 'src/typings/state/KernelState';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromError = from<ErrorState>().select('isBsod');
const fromKernel = from<KernelState>().select('installedPrograms', 'installProgram');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const Boot = ({}: Props) => {
  const { isBsod } = useErrorState(fromError);
  const { installedPrograms, installProgram } = useKernelState(fromKernel);
  useLastClickPosition();
  useLastKeyPress();

  if (!installedPrograms.length) {
    for (const binary of binaries) {
      installProgram(binary);
    }
  }

  return isBsod ? <Bsod /> : <Explorer />;
};
