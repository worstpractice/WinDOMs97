import { onLMB } from "event-filters/onLMB";
import type { OsRef } from "typings/OsRef";
import { compose } from "utils/compose";
import { listen } from "utils/listen";
import { moveInFront } from "utils/moveInFront";

export const useOnMoveWindow = <T extends OsRef<U>, U extends HTMLElement>(osWindowRef: T) => {
  const handleMouseDown = onLMB<U>(({ clientX, clientY }) => {
    const { current: osWindow } = osWindowRef;

    if (!osWindow) return;

    moveInFront(osWindowRef);

    const shiftX = clientX - osWindow.getBoundingClientRect().left;
    const shiftY = clientY - osWindow.getBoundingClientRect().top;

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<Document>(({ clientX, clientY }) => {
      const newLeft = clientX - shiftX;
      const newTop = clientY - shiftY;

      osWindow.style.left = `${newLeft}px`;
      osWindow.style.top = `${newTop}px`;
    });

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<Document>(() => {
      cleanup();
    });

    cleanup = compose(
      listen({ event: "mousemove", handler: onMouseMove, on: document }),
      listen({ event: "mouseup", handler: onMouseUp, on: document }),
    );
  });

  return handleMouseDown;
};
