import { useKernel } from "kernel/useKernel";
import type { Alternative } from "typings/Alternative";
import type { Binary } from "typings/Binary";
import type { OS } from "typings/kernel/OS";
import { alt } from "utils/alt";

const selector = ({ executeBinary, uninstallProgram }: OS) => ({
  executeBinary,
  uninstallProgram,
});

// NOTE: Remember to UTILIZE the selector too. Like, pass it to `useKernel.`

export const useBinaryAlternatives = (binary: Binary): readonly Alternative[] => {
  const { executeBinary, uninstallProgram } = useKernel(selector);

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
