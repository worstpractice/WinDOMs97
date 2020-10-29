import { useKernelState } from "state/useKernelState";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import type { KernelState } from "state/useKernelState";
import { alt } from "utils/alt";

const fromKernel = ({ executeBinary, uninstallProgram }: KernelState) => ({
  executeBinary,
  uninstallProgram,
});

export const useBinaryAlternatives = (binary: Binary): readonly Alternative[] => {
  const { executeBinary, uninstallProgram } = useKernelState(fromKernel);

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
    ////////////////////////////////////////////////
    alt("Open", () => {
      executeBinary(binary);
    }),
    ////////////////////////////////////////////////
    alt("Rename", () => {
      console.log("This is where we rename", binary.fileName);
    }),
    ////////////////////////////////////////////////
    alt("Delete", () => {
      uninstallProgram(binary);
    }),
    ////////////////////////////////////////////////
  ] as const;
};
