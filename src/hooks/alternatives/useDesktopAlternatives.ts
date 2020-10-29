import { useKernelState } from "state/useKernelState";
import type { Alternative } from "typings/Alternative";
import type { KernelState } from "state/useKernelState";
import { alt } from "utils/alt";

const fromKernel = ({ bluescreen }: KernelState) => ({
  bluescreen,
});

export const useDesktopAlternatives = (): readonly Alternative[] => {
  const { bluescreen } = useKernelState(fromKernel);

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
    alt("New folder", () => {
      console.log("We create a new folder");
    }),
    alt("Halt and catch fire", () => {
      bluescreen("HALT_AND_CATCH_FIRE", "Something went wrong");
    }),
  ] as const;
};
