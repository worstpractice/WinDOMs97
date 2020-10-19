import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Process } from "typings/Process";

const alt = (label: string, action: () => void): Alternative => {
  return { label, action } as const;
};

export const useAlternatives = (process: Process) => {
  const { endProcess, maximize, minimize } = useKernel();

  const alternatives: readonly Alternative[] = [
    alt("Exit", () => {
      endProcess(process);
    }),
    alt("Maximize", () => {
      maximize(process);
    }),
    alt("Minimize", () => {
      minimize(process);
    }),
  ] as const;

  return alternatives;
};
