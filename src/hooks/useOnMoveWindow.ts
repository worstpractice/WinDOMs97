import type { MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { moveInFront } from "utils/moveInFront";
import { onLMB } from "utils/onLMB";

export const useOnMoveWindow = (windowRef: MutableRefObject<HTMLDivElement | null>) => {
  const handleMouseDown = onLMB(({ clientX, clientY }) => {
    const osWindow = windowRef.current;

    if (!osWindow) return;

    const shiftX = clientX - osWindow.getBoundingClientRect().left;
    const shiftY = clientY - osWindow.getBoundingClientRect().top;

    let cleanup: () => void;

    moveInFront(osWindow);

    /** `Document`-level event listener. */
    const onMouseMove = onLMB(({ pageX, pageY }) => {
      osWindow.style.left = `${pageX - shiftX}px`;
      osWindow.style.top = `${pageY - shiftY}px`;
    });

    /** `Document`-level event listener. */
    const onMouseUp = onLMB(() => {
      cleanup();
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
