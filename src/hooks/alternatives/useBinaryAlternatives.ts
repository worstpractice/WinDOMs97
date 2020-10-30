import { useExecuteBinary } from "hooks/syscalls/useExecuteBinary";
import type { KernelState } from "typings/state/KernelState";
import { useKernelState } from "state/useKernelState";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import { alt } from "utils/alt";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ uninstallProgram }: KernelState) => ({
  uninstallProgram,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useBinaryAlternatives = (binary: Binary): readonly Alternative[] => {
  const { uninstallProgram } = useKernelState(fromKernel);
  const executeBinary = useExecuteBinary(binary);

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
    ////////////////////////////////////////////////
    alt("Open", () => {
      executeBinary();
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
