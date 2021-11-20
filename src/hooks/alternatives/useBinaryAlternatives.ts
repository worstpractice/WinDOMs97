import { useExecuteBinary } from 'hooks/syscalls/useExecuteBinary';
import { useKernelState } from 'state/useKernelState';
import type { Binary } from 'typings/Binary';
import type { KernelState } from 'typings/state/KernelState';
import { alt } from 'utils/alt';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ uninstallProgram }: KernelState) => {
  return {
    uninstallProgram,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useBinaryAlternatives = (binary: Binary) => {
  const { uninstallProgram } = useKernelState(fromKernel);
  const executeBinary = useExecuteBinary(binary);

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  const alternatives = [
    ////////////////////////////////////////////////
    alt('Open', () => {
      executeBinary();
    }),
    ////////////////////////////////////////////////
    alt('Rename', () => {
      binary.isBeingRenamed = true;
    }),
    ////////////////////////////////////////////////
    alt('Delete', () => {
      uninstallProgram(binary);
    }),
    ////////////////////////////////////////////////
  ] as const;

  return alternatives;
};
