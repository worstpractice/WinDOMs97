import { useKernel } from "kernel/useKernel";
import type { Alternative } from "typings/Alternative";
import type { OS } from "typings/kernel/OS";
import { alt } from "utils/alt";

const selector = ({ bluescreen }: OS) => ({
  bluescreen,
});

// NOTE: Remember to UTILIZE the selector too. Like, pass it to `useKernel.`

export const useDesktopAlternatives = (): readonly Alternative[] => {
  const { bluescreen } = useKernel(selector);

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
