import type { MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { moveInFront } from "utils/moveInFront";
import { onLMB } from "utils/onLMB";

export const useOnResizeWindow = (windowRef: MutableRefObject<HTMLDivElement | null>) => {
  const handleMouseDown = onLMB(() => {
    const osWindow = windowRef.current;

    if (!osWindow) return;

    moveInFront(osWindow);

    /** `Document`-level event listener. */
    const onMouseMove = onLMB(({ pageX, pageY }) => {
      const shiftX = pageX - osWindow.getBoundingClientRect().left;
      const shiftY = pageY - osWindow.getBoundingClientRect().top;

      osWindow.style.width = `${shiftX}px`;
      osWindow.style.height = `${shiftY}px`;
    });

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseUp = onLMB(() => {
      cleanup();
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
