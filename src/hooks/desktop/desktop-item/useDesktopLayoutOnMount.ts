import { useLayoutEffect } from "react";
import type { OsRef } from "typings/OsRef";

/** Denotes how many hundred pixels. */
let x = 0;
/** Denotes how many hundred pixels. */
let y = 0;

/** Denotes how many hundred pixels. */
const maxHeight = Number(document.documentElement.clientHeight.toString()[0]);

export const useDesktopLayoutOnMount = <T extends OsRef<HTMLElement>>(desktopItemRef: T) => {
  useLayoutEffect(() => {
    const { current } = desktopItemRef;

    if (!current) return;

    if (x === maxHeight) {
      x = 0;
      y++;
    }

    current.style.top = `${x++}00px`;
    current.style.left = `${y}00px`;

    // Increment `x` one extra time on purpose
    x++;
  }, [desktopItemRef]);
};
