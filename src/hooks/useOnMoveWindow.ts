import { onLMB } from "event-filters/onLMB";
import type { OsRef } from "typings/OsRef";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { moveInFront } from "utils/moveInFront";

export const useOnMoveWindow = <T extends OsRef<U>, U extends HTMLElement>(windowRef: T) => {
  const handleMouseDown = onLMB<U>(({ clientX, clientY }) => {
    const osWindow = windowRef.current;

    if (!osWindow) return;

    const shiftX = clientX - osWindow.getBoundingClientRect().left;
    const shiftY = clientY - osWindow.getBoundingClientRect().top;

    moveInFront({ current: osWindow });

    /** `Document`-level event listener. */
    const onMouseMove = onLMB<HTMLBodyElement>(({ pageX, pageY }) => {
      osWindow.style.left = `${pageX - shiftX}px`;
      osWindow.style.top = `${pageY - shiftY}px`;
    });

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB<HTMLBodyElement>(() => {
      cleanup();
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
