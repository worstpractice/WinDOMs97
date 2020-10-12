import { onLMB } from "event-filters/onLMB";
import { useState } from "react";
import type { OsRef } from "typings/OsRef";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { moveInFront } from "utils/moveInFront";
import styles from "./useOnDragAndDrop.module.css";

export const useOnDragAndDrop = <T extends OsRef<U>, U extends HTMLElement>(desktopItemRef: T) => {
  const [isMoving, setIsMoving] = useState(false);

  const handleMouseDown = onLMB<U>(({ clientX, clientY }) => {
    const { current: desktopItem } = desktopItemRef;

    if (!desktopItem) return;

    const shiftX = clientX - desktopItem.getBoundingClientRect().left;
    const shiftY = clientY - desktopItem.getBoundingClientRect().top;

    moveInFront({ current: desktopItem });

    const clone = desktopItem.cloneNode(true) as HTMLDivElement;
    clone.classList.add(styles.Moving);
    // Places the transparent clone "in front of" all
    desktopItem.after(clone);

    desktopItem.classList.add(styles.Original);

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<HTMLBodyElement>(({ pageX, pageY }) => {
      clone.style.left = `${pageX - shiftX}px`;
      clone.style.top = `${pageY - shiftY}px`;
    });

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<HTMLBodyElement>(({ pageX, pageY }) => {
      clone.classList.remove(styles.Moving);
      clone.remove();

      desktopItem.classList.remove(styles.Original);

      desktopItem.style.left = `${pageX - shiftX}px`;
      desktopItem.style.top = `${pageY - shiftY}px`;

      cleanup();

      setIsMoving(false);
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));

    setIsMoving(true);
  });

  return [isMoving, handleMouseDown] as const;
};
