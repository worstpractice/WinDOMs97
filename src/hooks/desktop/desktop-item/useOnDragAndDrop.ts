import { onLMB } from "event-filters/onLMB";
import type { OsRef } from "typings/OsRef";
import { compose } from "utils/compose";
import { listen } from "utils/listen";
import { bringToFront } from "utils/bringToFront";
import styles from "./useOnDragAndDrop.module.css";

export const useOnDragAndDrop = <T extends OsRef<U>, U extends HTMLElement>(desktopItemRef: T) => {
  const handleMouseDown = onLMB<U>(({ clientX, clientY }) => {
    const { current: desktopItem } = desktopItemRef;

    if (!desktopItem) return;

    const shiftX = clientX - desktopItem.getBoundingClientRect().left;
    const shiftY = clientY - desktopItem.getBoundingClientRect().top;

    bringToFront({ current: desktopItem });

    const clone = desktopItem.cloneNode(true) as HTMLDivElement;
    clone.classList.add(styles.Moving);
    // Places the transparent clone at the VERY front
    desktopItem.after(clone);

    desktopItem.classList.add(styles.Original);

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<Document>(({ clientX, clientY }) => {
      const newLeft = clientX - shiftX;
      const newTop = clientY - shiftY;

      clone.style.left = `${newLeft}px`;
      clone.style.top = `${newTop}px`;
    });

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<Document>(({ clientX, clientY }) => {
      clone.classList.remove(styles.Moving);
      clone.remove();

      desktopItem.classList.remove(styles.Original);

      const newLeft = clientX - shiftX;
      const newTop = clientY - shiftY;

      desktopItem.style.left = `${newLeft}px`;
      desktopItem.style.top = `${newTop}px`;

      cleanup();
    });

    cleanup = compose(
      listen({ event: "mousemove", handler: onMouseMove, on: document }),
      listen({ event: "mouseup", handler: onMouseUp, on: document }),
    );
  });

  return handleMouseDown;
};
