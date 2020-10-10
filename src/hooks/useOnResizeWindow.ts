import type { MutableRefObject } from "react";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { getResizeLatitude } from "utils/getResizeLatitude";
import { moveInFront } from "utils/moveInFront";
import { onLMB } from "utils/onLMB";

export const useOnResizeWindow = (windowRef: MutableRefObject<HTMLDivElement | null>) => {
  /** Drag start event. */
  const handleMouseDown = onLMB((e) => {
    const osWindow = windowRef.current;

    if (!osWindow) return;

    moveInFront(osWindow);

    const latitude = getResizeLatitude(osWindow, e);

    console.log(latitude);

    const { clientX, clientY } = e;

    const startingShiftX = clientX - osWindow.getBoundingClientRect().left;
    const startingShiftY = clientY - osWindow.getBoundingClientRect().top;

    const startingLeft = osWindow.getBoundingClientRect().left;
    const startingTop = osWindow.getBoundingClientRect().top;

    const startingWidth = osWindow.getBoundingClientRect().width;
    const startingHeight = osWindow.getBoundingClientRect().height;

    /** Stream of events while dragging. */
    const onMouseMove = onLMB(({ pageX, pageY }) => {
      const currentLeft = osWindow.getBoundingClientRect().left;
      const currentTop = osWindow.getBoundingClientRect().top;

      // TODO: Why are these not being used? Highly suspicious.
      // const currentWidth = osWindow.getBoundingClientRect().width;
      // const currentHeight = osWindow.getBoundingClientRect().height;

      let left = "";
      let top = "";

      let width = "";
      let height = "";

      switch (latitude) {
        // TODO: Detect when we've slammed into the min-height of the window and stop, or the shrink-drag turns into a general window move (in that direction).
        case "N": {
          // left
          top = `${pageY - startingShiftY}px`;

          // width
          height = `${startingHeight + (startingTop - currentTop)}px`;
          break;
        }
        case "NE": {
          // left
          top = `${pageY - startingShiftY}px`;

          width = `${pageX - currentLeft}px`;
          height = `${startingHeight + (startingTop - currentTop)}px`;
          break;
        }
        case "E": {
          // left
          // top

          width = `${pageX - currentLeft}px`;
          // height
          break;
        }
        case "SE": {
          // left
          // top

          width = `${pageX - currentLeft}px`;
          height = `${pageY - currentTop}px`;
          break;
        }
        case "S": {
          // left
          // top

          // width
          height = `${pageY - currentTop}px`;
          break;
        }
        case "SW": {
          left = `${pageX - startingShiftX}px`;
          // top

          width = `${startingWidth + (startingLeft - currentLeft)}px`;
          height = `${pageY - currentTop}px`;
          break;
        }
        case "W": {
          left = `${pageX - startingShiftX}px`;
          // top

          width = `${startingWidth + (startingLeft - currentLeft)}px`;
          // height
          break;
        }
        case "NW": {
          left = `${pageX - startingShiftX}px`;
          top = `${pageY - startingShiftY}px`;

          width = `${startingWidth + (startingLeft - currentLeft)}px`;
          height = `${startingHeight + (startingTop - currentTop)}px`;
          break;
        }
        default:
          throw new RangeError("WTF");
      }

      if (left) osWindow.style.left = left;
      if (top) osWindow.style.top = top;

      if (width) osWindow.style.width = width;
      if (height) osWindow.style.height = height;
    });

    let cleanup: () => void;

    /** Drag stop event. */
    const onMouseUp = onLMB(() => {
      cleanup();
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
