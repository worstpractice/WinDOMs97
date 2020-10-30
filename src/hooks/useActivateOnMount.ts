import { useLayoutEffect } from "react";
import { useActiveState } from "state/useActiveState";
import type { OsRef } from "typings/OsRef";
import type { ActiveState } from "typings/state/ActiveState";
import { moveInFront } from "utils/moveInFront";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromActive = ({ activate }: ActiveState) => ({
  activate,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useActivateOnMount = <T extends OsRef<HTMLElement>>(ref: T) => {
  const { activate } = useActiveState(fromActive);

  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      activate(ref);
      moveInFront(ref);
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [activate, ref]);
};
