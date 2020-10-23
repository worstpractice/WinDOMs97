import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import { alt } from "utils/alt";

export const useBinaryAlternatives = (binary: Binary): readonly Alternative[] => {
  const { executeBinary, uninstallProgram } = useKernel();

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
