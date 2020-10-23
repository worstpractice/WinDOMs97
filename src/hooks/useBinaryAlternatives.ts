import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import { alt } from "utils/alt";

export const useBinaryAlternatives = (binary: Binary): readonly Alternative[] => {
  const { executeBinary, uninstallProgram } = useKernel();

  return [
    ////////////////////////////////////////////////
    alt("Delete", () => {
      uninstallProgram(binary);
    }),
    ////////////////////////////////////////////////
    alt("Run", () => {
      executeBinary(binary);
    }),
    ////////////////////////////////////////////////
  ] as const;
};
