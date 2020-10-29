import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";
import { useActiveState } from "state/useActiveState";
import type { KernelState } from "state/useKernelState";
import { useKernelState } from "state/useKernelState";
import type { Alternative } from "typings/Alternative";
import type { Process } from "typings/Process";
import { alt } from "utils/alt";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromKernel = ({ endProcess }: KernelState) => ({
  endProcess,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useProcessAlternatives = (process: Process): readonly Alternative[] => {
  const { activate } = useActiveState();
  const { endProcess } = useKernelState(fromKernel);
  const { maximize, minimize, unMaximize, unMinimize } = useOsWindowControls(process);

  const { isMaximized, isMinimized, osWindowRef } = process;

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
    ////////////////////////////////////////////////
    alt("Exit", () => {
      endProcess(process);
    }),
    ////////////////////////////////////////////////
    isMaximized
      ? alt("Unmaximize", () => {
          unMaximize();
          activate(osWindowRef);
        })
      : alt("Maximize", () => {
          maximize();
          activate(osWindowRef);
        }),
    ////////////////////////////////////////////////
    isMinimized
      ? alt("Unminimize", () => {
          unMinimize();
          activate(osWindowRef);
        })
      : alt("Minimize", () => {
          minimize();
          activate({ current: null });
        }),
    ////////////////////////////////////////////////
  ] as const;
};
