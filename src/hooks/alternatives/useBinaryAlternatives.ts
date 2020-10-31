import { useExecuteBinary } from "hooks/syscalls/useExecuteBinary";
import { useMemo } from "react";
import { useKernelState } from "state/useKernelState";
import type { Binary } from "typings/Binary";
import type { KernelState } from "typings/state/KernelState";
import { alt } from "utils/alt";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ uninstallProgram }: KernelState) => ({
  uninstallProgram,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useBinaryAlternatives = (binary: Binary) => {
  const { uninstallProgram } = useKernelState(fromKernel);
  const executeBinary = useExecuteBinary(binary);

  const alternatives = useMemo(() => {
    // NOTE: `ContextMenuItems` get listed in the order specified here.
    return [
      ////////////////////////////////////////////////
      alt("Open", () => {
        executeBinary();
      }),
      ////////////////////////////////////////////////
      alt("Rename", () => {
        binary.isBeingRenamed = true;
      }),
      ////////////////////////////////////////////////
      alt("Delete", () => {
        uninstallProgram(binary);
      }),
      ////////////////////////////////////////////////
    ] as const;
  }, [binary, executeBinary, uninstallProgram]);

  return alternatives;
};
