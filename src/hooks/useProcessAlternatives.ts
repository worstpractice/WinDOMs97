import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Process } from "typings/Process";
import { alt } from "utils/alt";

export const useProcessAlternatives = (process: Process) => {
  const { activate, endProcess, maximize, minimize, unMaximize, unMinimize } = useKernel();

  const { isMaximized, isMinimized, osWindowRef } = process;

  ////////////////////////////////////////////////

  const altExit = alt("Exit", () => {
    endProcess(process);
  });

  const altMaximize = alt("Maximize", () => {
    maximize(process);
    activate(osWindowRef);
  });

  const altMinimize = alt("Minimize", () => {
    minimize(process);
    activate({ current: null });
  });

  const altUnMaximize = alt("Unmaximize", () => {
    unMaximize(process);
    activate(osWindowRef);
  });

  const altUnMinimize = alt("Unminimize", () => {
    unMinimize(process);
    activate(osWindowRef);
  });

  ////////////////////////////////////////////////

  const alternatives: Alternative[] = [
    altExit,
    isMaximized ? altUnMaximize : altMaximize,
    isMinimized ? altUnMinimize : altMinimize,
  ];

  return alternatives;
};
