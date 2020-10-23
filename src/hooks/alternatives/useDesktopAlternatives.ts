import { useKernel } from "kernel";
import type { Alternative } from "typings/Alternative";
import { alt } from "utils/alt";

export const useDesktopAlternatives = (): readonly Alternative[] => {
  const { bluescreen } = useKernel();

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
    alt("New folder", () => {
      console.log("We create a new folder");
    }),
    alt("Halt and catch fire", () => {
      bluescreen("Halt and catch fire");
    }),
  ] as const;
};
