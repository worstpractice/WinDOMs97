import { useOsWindowControls } from "hooks/os-window/useOsWindowControls";
import { useActiveState } from "state/useActiveState";
import { useKernelState } from "state/useKernelState";
import type { Alternative } from "typings/Alternative";
import type { Process } from "typings/Process";
import type { ActiveState } from "typings/state/ActiveState";
import type { KernelState } from "typings/state/KernelState";
import { alt } from "utils/alt";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate }: ActiveState) => ({
  activate,
});

const fromKernel = ({ endProcess }: KernelState) => ({
  endProcess,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useProcessAlternatives = (process: Process): readonly Alternative[] => {
  const { activate } = useActiveState(fromActive);
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
