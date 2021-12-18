import { useOsWindowControls } from 'src/hooks/os-window/useOsWindowControls';
import { useActiveState } from 'src/state/useActiveState';
import { useKernelState } from 'src/state/useKernelState';
import type { Process } from 'src/typings/Process';
import type { ActiveState } from 'src/typings/state/ActiveState';
import type { KernelState } from 'src/typings/state/KernelState';
import { alt } from 'src/utils/alt';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = from<ActiveState>().select('setActiveRef', 'unsetActiveRef');
const fromKernel = from<KernelState>().select('endProcess');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useProcessAlternatives = (process: Process) => {
  const { setActiveRef, unsetActiveRef } = useActiveState(fromActive);
  const { endProcess } = useKernelState(fromKernel);
  const { maximize, minimize, unMaximize, unMinimize } = useOsWindowControls(process);

  const { isMaximized, isMinimized, osWindowRef } = process;

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
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
};
