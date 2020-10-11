import { onLMB } from "event-filters/onLMB";
import { useState } from "react";
import type { OsRef } from "typings/OsRef";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { moveInFront } from "utils/moveInFront";
import styles from "./useOnMoveShortcut.module.css";

export const useOnDragAndDrop = ({ current: shortcut }: OsRef) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const handleMouseDown = onLMB(({ clientX, clientY }) => {
    if (!shortcut) return;

    const shiftX = clientX - shortcut.getBoundingClientRect().left;
    const shiftY = clientY - shortcut.getBoundingClientRect().top;

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

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB(({ pageX, pageY }) => {
      clone.classList.remove(styles.Moving);
      clone.remove();

      shortcut.classList.remove(styles.Original);

      shortcut.style.left = `${pageX - shiftX}px`;
      shortcut.style.top = `${pageY - shiftY}px`;

      cleanup();

      setIsMoving(false);
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));

    setIsMoving(true);
  });

  return [isMoving, handleMouseDown] as const;
};
