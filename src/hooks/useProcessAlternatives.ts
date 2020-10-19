import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Process } from "typings/Process";
import { alt } from "utils/alt";

export const useProcessAlternatives = (process: Process) => {
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
