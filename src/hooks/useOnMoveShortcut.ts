import { MouseEventHandler, MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import styles from "./useOnMoveShortcut.module.css";

// MMB = 1, RMB = 2
const LMB = 0 as const;

export const useOnMoveShortcut = <T extends MutableRefObject<HTMLDivElement | null>>(elementRef: T) => {
  const handleMouseDown: MouseEventHandler = ({ button, clientX, clientY }) => {
    if (button !== LMB) return;

    const shortcut = elementRef.current;

    if (!shortcut) return;

    const shiftX = clientX - shortcut.getBoundingClientRect().left;
    const shiftY = clientY - shortcut.getBoundingClientRect().top;

    let cleanup: () => void;

    // Places the most recently moved shortcut "on top" of all the shortcuts
    shortcut.parentElement?.lastElementChild?.after(shortcut);

    const clone = shortcut.cloneNode(true) as HTMLDivElement;
    clone.classList.add(styles.Moving);
    // Places the transparent clone topmost of all
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
