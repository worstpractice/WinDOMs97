import { default as React } from 'react';
import { programs } from 'src/data';
import { Bsod } from 'src/features/Bsod';
import { Explorer } from 'src/features/Explorer';
import { useLastClickPosition } from 'src/hooks/useLastClickPosition';
import { useLastKeyPress } from 'src/hooks/useLastKeyPress';
import { useErrorState } from 'src/state/useErrorState';
import { useKernelState } from 'src/state/useKernelState';
import type { ErrorState } from 'src/typings/state/ErrorState';
import type { KernelState } from 'src/typings/state/KernelState';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromError = ({ isBsod }: ErrorState) => {
  return {
    isBsod,
  };
};

const fromKernel = ({ installedPrograms, installProgram }: KernelState) => {
  return {
    installedPrograms,
    installProgram,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const Boot = ({}: Props) => {
  const { isBsod } = useErrorState(fromError);
  const { installedPrograms, installProgram } = useKernelState(fromKernel);
  useLastClickPosition();
  useLastKeyPress();

  if (!installedPrograms.length) {
    for (const each of programs) {
      installProgram(each);
    }
  }

  return isBsod ? <Bsod /> : <Explorer />;
};
