import type { MouseEventHandler, MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { LMB } from "utils/constants";
import { moveToForeground } from "utils/moveToForeground";
import styles from "./useOnMoveShortcut.module.css";

export const useOnMoveShortcut = <T extends MutableRefObject<HTMLDivElement | null>>(shortcutRef: T) => {
  const handleMouseDown: MouseEventHandler = ({ button, clientX, clientY }) => {
    if (button !== LMB) return;

    const shortcut = shortcutRef.current;

    if (!shortcut) return;

    const shiftX = clientX - shortcut.getBoundingClientRect().left;
    const shiftY = clientY - shortcut.getBoundingClientRect().top;

    let cleanup: () => void;

    moveToForeground(shortcut);

    const clone = shortcut.cloneNode(true) as HTMLDivElement;
    clone.classList.add(styles.Moving);
    // Places the transparent clone "in front of" all
    shortcut.after(clone);

    shortcut.classList.add(styles.Original);

    /** `Document`-level event listener. */
    const onMouseMove: MouseEventHandler = ({ button, pageX, pageY }) => {
      if (button !== LMB) return;

      clone.style.left = `${pageX - shiftX}px`;
      clone.style.top = `${pageY - shiftY}px`;
    };

    /** `Document`-level event listener. */
    const onMouseUp: MouseEventHandler = ({ button, pageX, pageY }) => {
      if (button !== LMB) return;

      clone.classList.remove(styles.Moving);
      clone.remove();

      shortcut.classList.remove(styles.Original);

      shortcut.style.left = `${pageX - shiftX}px`;
      shortcut.style.top = `${pageY - shiftY}px`;

      cleanup();
    };

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  };

  return handleMouseDown;
};
