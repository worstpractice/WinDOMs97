import { useOsWindowControls } from 'hooks/os-window/useOsWindowControls';
import { useActiveState } from 'state/useActiveState';
import { useKernelState } from 'state/useKernelState';
import type { Process } from 'typings/Process';
import type { ActiveState } from 'typings/state/ActiveState';
import type { KernelState } from 'typings/state/KernelState';
import { alt } from 'utils/alt';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ setActiveRef, unsetActiveRef }: ActiveState) => {
  return {
    setActiveRef,
    unsetActiveRef,
  };
};

const fromKernel = ({ endProcess }: KernelState) => {
  return {
    endProcess,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useProcessAlternatives = (process: Process) => {
  const { setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { endProcess } = useKernelState(fromKernel);
  const { maximize, minimize, unMaximize, unMinimize } = useOsWindowControls(process);

  const { isMaximized, isMinimized, osWindowRef } = process;

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  const alternatives = [
    ////////////////////////////////////////////////
    alt('Exit', () => {
      endProcess(process);
    }),
    ////////////////////////////////////////////////
    isMaximized
      ? alt('Unmaximize', () => {
          unMaximize();
          setActiveRef(osWindowRef);
        })
      : alt('Maximize', () => {
          maximize();
          setActiveRef(osWindowRef);
        }),
    ////////////////////////////////////////////////
    isMinimized
      ? alt('Unminimize', () => {
          unMinimize();
          setActiveRef(osWindowRef);
        })
      : alt('Minimize', () => {
          minimize();
          unsetActiveRef();
        }),
    ////////////////////////////////////////////////
  ] as const;

  return alternatives;
};
