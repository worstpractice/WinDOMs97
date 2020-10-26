import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Kernel } from "typings/kernel/Kernel";
import type { Process } from "typings/Process";
import { alt } from "utils/alt";

const selector = ({ activate, endProcess, maximize, minimize, unMaximize, unMinimize }: Kernel) => ({
  activate,
  endProcess,
  maximize,
  minimize,
  unMaximize,
  unMinimize,
});

export const useProcessAlternatives = (process: Process): readonly Alternative[] => {
  const { activate, endProcess, maximize, minimize, unMaximize, unMinimize } = useKernel(selector);

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
          unMaximize(process);
          activate(osWindowRef);
        })
      : alt("Maximize", () => {
          maximize(process);
          activate(osWindowRef);
        }),
    ////////////////////////////////////////////////
    isMinimized
      ? alt("Unminimize", () => {
          unMinimize(process);
          activate(osWindowRef);
        })
      : alt("Minimize", () => {
          minimize(process);
          activate({ current: null });
        }),
    ////////////////////////////////////////////////
  ] as const;
};
