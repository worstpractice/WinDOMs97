import { onLMB } from "event-filters/onLMB";
import { useDraggedState } from "state/useDraggedState";
import type { CleanupFn } from "typings/CleanupFn";
import type { OsRef } from "typings/OsRef";
import type { DraggedState } from "typings/state/DraggedState";
import { bringToFront } from "utils/bringToFront";
import { compose } from "utils/compose";
import { listen } from "utils/listen";
import styles from "./useOnDragAndDrop.module.css";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromDragged = ({ setDraggedRef, unsetDraggedRef }: DraggedState) => ({
  setDraggedRef,
  unsetDraggedRef,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useOnDragAndDrop = <T extends OsRef<U>, U extends HTMLElement>(desktopItemRef: T) => {
  const { setDraggedRef, unsetDraggedRef } = useDraggedState(fromDragged);

  const handleMouseDown = onLMB<U>(({ clientX, clientY }) => {
    // Target here is whatever we START DRAGGING.
    const { current: desktopItem } = desktopItemRef;

    if (!desktopItem) return;

    setDraggedRef(desktopItemRef);

    const shiftX = clientX - desktopItem.getBoundingClientRect().left;
    const shiftY = clientY - desktopItem.getBoundingClientRect().top;

    bringToFront({ current: desktopItem });

    const clone = desktopItem.cloneNode(true) as HTMLDivElement;
    clone.classList.add(styles.Moving ?? "");
    // Places the transparent clone at the VERY front
    desktopItem.after(clone);

    desktopItem.classList.add(styles.Original ?? "");

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<Document>(({ clientX, clientY, target }) => {
      // Target here is whatever we DRAG OVER (but not necessarily what we DROP on)
      const newLeft = clientX - shiftX;
      const newTop = clientY - shiftY;

      clone.style.left = `${newLeft}px`;
      clone.style.top = `${newTop}px`;
    });

    let cleanup: CleanupFn;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<Document>(({ clientX, clientY }) => {
      // Target here is whatever we DROP ON (will have been the DRAG target atleast once before it shows up here -- gotta be above something first before you can drop over it)
      clone.classList.remove(styles.Moving ?? "");
      clone.remove();

      desktopItem.classList.remove(styles.Original ?? "");

      const newLeft = clientX - shiftX;
      const newTop = clientY - shiftY;

      desktopItem.style.left = `${newLeft}px`;
      desktopItem.style.top = `${newTop}px`;

      unsetDraggedRef();
      cleanup();
    });

    cleanup = compose(
      listen({ event: "mousemove", handler: onMouseMove, on: document }),
      listen({ event: "mouseup", handler: onMouseUp, on: document }),
    );
  });

  return handleMouseDown;
};
