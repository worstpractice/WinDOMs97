import { useExecuteBinary } from 'src/hooks/syscalls/useExecuteBinary';
import { useKernelState } from 'src/state/useKernelState';
import type { Binary } from 'src/typings/Binary';
import type { KernelState } from 'src/typings/state/KernelState';
import { alt } from 'src/utils/alt';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = from<KernelState>().select('uninstallProgram');
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
