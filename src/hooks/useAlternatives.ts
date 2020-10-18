import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Process } from "typings/Process";

export const useAlternatives = (process: Process) => {
  const { endProcess, maximize, minimize } = useKernel();

  const alternatives: readonly Alternative[] = [
    { label: "Exit", action: () => endProcess(process) },
    { label: "Maximize", action: () => maximize(process) },
    { label: "Minimize", action: () => minimize(process) },
  ] as const;

  // MAKE THE CONTEXT MENU GROW UPWARDS PLZ

  return alternatives;
};
