import { useLayoutEffect } from "react";
import type { OsRef } from "typings/OsRef";

/** Denotes how many hundred pixels. */
let x = 0;
/** Denotes how many hundred pixels. */
let y = 0;

/** Current screen height, in pixels. */
const clientHeight = Number(document.documentElement.clientHeight.toString());

export const useDesktopLayoutOnMount = <T extends HTMLElement>(desktopItemRef: OsRef<T>) => {
  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { current } = desktopItemRef;

      if (!current) return;

      /** Since we don't want any icons placed UNDER the taskbar, we bail at `clientHeight` minus 200 pixels. */
      const maxDistanceDown = clientHeight - 200;

      if (x >= maxDistanceDown) {
        /** We reset `x`, meaning we start from the top of the screen next time around. */
        x = 0;
        /** We add 200 to */
        y += 200;
      }

      current.style.top = `${x}px`;
      current.style.left = `${y}px`;

      x += 200;
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [desktopItemRef]);
};
