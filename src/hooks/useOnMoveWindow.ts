import { onLMB } from "event-filters/onLMB";
import type { OsRef } from "typings/OsRef";
import { listen } from "utils/listen";
import { compose } from "utils/compose";
import { moveInFront } from "utils/moveInFront";

export const useOnMoveWindow = <T extends OsRef<U>, U extends HTMLElement>(windowRef: T) => {
  const handleMouseDown = onLMB<U>(({ clientX, clientY }) => {
    const { current: osWindow } = windowRef;

    if (!osWindow) return;

    moveInFront(windowRef);

    const shiftX = clientX - osWindow.getBoundingClientRect().left;
    const shiftY = clientY - osWindow.getBoundingClientRect().top;

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<HTMLBodyElement>(({ clientX, clientY }) => {
      osWindow.style.left = `${clientX - shiftX}px`;
      osWindow.style.top = `${clientY - shiftY}px`;
    });
    
    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<HTMLBodyElement>(() => {
      cleanup();
    });

    cleanup = compose(listen("mousemove", onMouseMove), listen("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
