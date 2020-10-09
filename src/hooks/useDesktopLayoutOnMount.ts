import { useLayoutEffect } from "react";

/** Denotes how many hundred pixels. */
let x = 0;
/** Denotes how many hundred pixels. */
let y = 0;

/** Denotes how many hundred pixels. */
const maxHeight = Number(document.documentElement.clientHeight.toString()[0]);

export const useDesktopLayoutOnMount = (ref: HTMLDivElement | null) => {
  useLayoutEffect(() => {
    if (!ref) return;

    if (x === maxHeight) {
      x = 0;
      y++;
    }

    ref.style.top = `${x++}00px`;
    ref.style.left = `${y}00px`;
  }, [ref]);
};
