import type { MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { moveInFront } from "utils/moveInFront";
import { onLMB } from "utils/onLMB";
import styles from "./useOnMoveShortcut.module.css";

export const useOnMoveShortcut = <T extends MutableRefObject<HTMLDivElement | null>>(shortcutRef: T) => {
  const handleMouseDown = onLMB(({ clientX, clientY }) => {
    const shortcut = shortcutRef.current;

    if (!shortcut) return;

    const shiftX = clientX - shortcut.getBoundingClientRect().left;
    const shiftY = clientY - shortcut.getBoundingClientRect().top;

    let cleanup: () => void;

    moveInFront(shortcut);

    const clone = shortcut.cloneNode(true) as HTMLDivElement;
    clone.classList.add(styles.Moving);
    // Places the transparent clone "in front of" all
    shortcut.after(clone);

    shortcut.classList.add(styles.Original);

    /** `Document`-level event listener. */
    const onMouseMove = onLMB(({ pageX, pageY }) => {
      clone.style.left = `${pageX - shiftX}px`;
      clone.style.top = `${pageY - shiftY}px`;
    });

    /** `Document`-level event listener. */
    const onMouseUp = onLMB(({ pageX, pageY }) => {
      clone.classList.remove(styles.Moving);
      clone.remove();

      shortcut.classList.remove(styles.Original);

      shortcut.style.left = `${pageX - shiftX}px`;
      shortcut.style.top = `${pageY - shiftY}px`;

      cleanup();
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
