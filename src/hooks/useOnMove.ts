import type { MouseEventHandler, MutableRefObject } from "react";

// MMB = 1, RMB = 2
const LMB = 0 as const;

export const useOnMove = (elementRef: MutableRefObject<HTMLDivElement | null>) => {
  const handleMouseDown: MouseEventHandler = ({ button, clientX, clientY }) => {
    if (button !== LMB) return;

    const shortcut = elementRef.current;

    if (!shortcut) return;

    let shiftX = clientX - shortcut.getBoundingClientRect().left;
    let shiftY = clientY - shortcut.getBoundingClientRect().top;

    /** `Document`-level event listener. */
    const onMouseMove = ({ button, pageX, pageY }: { button: number; pageX: number; pageY: number }) => {
      if (button !== LMB) return;

      shortcut.style.left = `${pageX - shiftX}px`;
      shortcut.style.top = `${pageY - shiftY}px`;
    };

    /** `Document`-level event listener. */
    const onMouseUp = ({ button }: { button: number }) => {
      if (button !== LMB) return;

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return handleMouseDown;
};
