import { HALT_AND_CATCH_FIRE } from "errors";
import { useErrorState } from "state/useErrorState";
import type { Alternative } from "typings/Alternative";
import type { ErrorState } from "typings/state/ErrorState";
import { alt } from "utils/alt";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromError = ({ bluescreen }: ErrorState) => ({
  bluescreen,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useDesktopAlternatives = (): readonly Alternative[] => {
  const { bluescreen } = useErrorState(fromError);

  // NOTE: `ContextMenuItems` get listed in the order specified here.
  return [
    alt("New folder", () => {
      console.log("We create a new folder");
    }),
    alt("Halt and catch fire", () => {
      bluescreen(HALT_AND_CATCH_FIRE);
    }),
  ] as const;
};
