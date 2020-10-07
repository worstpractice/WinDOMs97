import { MouseEventHandler, MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";

// MMB = 1, RMB = 2
const LMB = 0 as const;

export const useOnMoveWindow = <T extends MutableRefObject<HTMLDivElement | null>>(elementRef: T) => {
  const handleMouseDown: MouseEventHandler = ({ button, clientX, clientY }) => {
    if (button !== LMB) return;

    const OsWindow = elementRef.current;

    if (!OsWindow) return;

    const shiftX = clientX - OsWindow.getBoundingClientRect().left;
    const shiftY = clientY - OsWindow.getBoundingClientRect().top;

    let cleanup: () => void;

    /** `Document`-level event listener. */
    const onMouseMove: MouseEventHandler = ({ button, pageX, pageY }) => {
      if (button !== LMB) return;

      OsWindow.style.left = `${pageX - shiftX}px`;
      OsWindow.style.top = `${pageY - shiftY}px`;
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
