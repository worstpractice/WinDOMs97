import type { MouseEventHandler, MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { LMB } from "utils/constants";
import { moveToForeground } from "utils/moveToForeground";

export const useOnMoveWindow = (windowRef: MutableRefObject<HTMLDivElement | null>) => {
  const handleMouseDown: MouseEventHandler = ({ button, clientX, clientY }) => {
    if (button !== LMB) return;

    const osWindow = windowRef.current;

    if (!osWindow) return;

    const shiftX = clientX - osWindow.getBoundingClientRect().left;
    const shiftY = clientY - osWindow.getBoundingClientRect().top;

    let cleanup: () => void;

    moveToForeground(osWindow);

    /** `Document`-level event listener. */
    const onMouseMove: MouseEventHandler = ({ button, pageX, pageY }) => {
      if (button !== LMB) return;

      osWindow.style.left = `${pageX - shiftX}px`;
      osWindow.style.top = `${pageY - shiftY}px`;
    };

    /** `Document`-level event listener. */
    const onMouseUp: MouseEventHandler = ({ button }) => {
      if (button !== LMB) return;

      cleanup();
    };

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  };

  return handleMouseDown;
};
