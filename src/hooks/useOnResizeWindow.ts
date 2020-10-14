import { onLMB } from "event-filters/onLMB";
import type { OsRef } from "typings/OsRef";
import { addEventListener } from "utils/addEventListener";
import { compose } from "utils/compose";
import { getResizeLatitude } from "utils/getResizeLatitude";
import { moveInFront } from "utils/moveInFront";

/** In pixels. */
const WINDOW_MIN_HEIGHT = 250 as const;
const WINDOW_MIN_WIDTH = 350 as const;

export const useOnResizeWindow = <T extends OsRef<HTMLElement>>(windowRef: T) => {
  /** Drag start event. */
  const handleMouseDown = onLMB<HTMLElement>((e) => {
    const osWindow = windowRef.current;

    if (!osWindow) return;

    moveInFront({ current: osWindow });

    const latitude = getResizeLatitude(osWindow, e);

    const { clientX, clientY } = e;

    const startingShiftX = clientX - osWindow.getBoundingClientRect().left;
    const startingShiftY = clientY - osWindow.getBoundingClientRect().top;

    const startingLeft = osWindow.getBoundingClientRect().left;
    const startingTop = osWindow.getBoundingClientRect().top;

    const startingWidth = osWindow.getBoundingClientRect().width;
    const startingHeight = osWindow.getBoundingClientRect().height;

    /** Stream of events while dragging. */
    const onMouseMove = onLMB<HTMLBodyElement>(({ pageX, pageY }) => {
      const currentLeft = osWindow.getBoundingClientRect().left;
      const currentTop = osWindow.getBoundingClientRect().top;

      const currentWidth = osWindow.getBoundingClientRect().width;
      const currentHeight = osWindow.getBoundingClientRect().height;

      let left = "";
      let top = "";

      let width = "";
      let height = "";

      // LEFT
      switch (latitude) {
        case "W":
        case "NW":
        case "SW": {
          const availableWidth = currentWidth - WINDOW_MIN_WIDTH;

          // NOTE: We're not just asking if `availableWidth` is truthy.
          // We're actively concerned about negative values here.
          if (availableWidth > 0) {
            const newLeft = pageX - startingShiftX;

            // If I wanted to pretend I knew math, I would call this value "delta".
            const differenceLeft = startingLeft + availableWidth;

            if (newLeft < differenceLeft) {
              left = `${newLeft}px`;
            }
          }
          break;
        }
      }

      // TOP
      switch (latitude) {
        case "N":
        case "NE":
        case "NW": {
          const availableHeight = currentHeight - WINDOW_MIN_HEIGHT;

          // NOTE: We're not just asking if `availableHeight` is truthy.
          // We're actively concerned about negative values here.
          if (availableHeight > 0) {
            const newTop = pageY - startingShiftY;

            // If I wanted to pretend I knew math, I would call this value "delta".
            const differenceTop = startingTop + availableHeight;

            if (newTop < differenceTop) {
              top = `${newTop}px`;
            }
          }
          break;
        }
      }

      // WIDTH
      switch (latitude) {
        case "E":
        case "NE":
        case "SE": {
          const newWidth = pageX - currentLeft;

          if (newWidth > WINDOW_MIN_WIDTH) {
            width = `${newWidth}px`;
          }
          break;
        }
        case "W":
        case "NW":
        case "SW": {
          // If I wanted to pretend I knew math, I would call this value "delta".
          const differenceLeft = startingLeft - currentLeft;

          const newWidth = startingWidth + differenceLeft;

          if (newWidth > WINDOW_MIN_WIDTH) {
            width = `${newWidth}px`;
          }
          break;
        }
      }

      // HEIGHT
      switch (latitude) {
        case "N":
        case "NE":
        case "NW": {
          // If I wanted to pretend I knew math, I would call this value "delta".
          const differenceTop = startingTop - currentTop;

          const newHeight = startingHeight + differenceTop;

          // The new height must be GREATER than the MINIMAL height.
          if (newHeight > WINDOW_MIN_HEIGHT) {
            height = `${newHeight}px`;
          }
          break;
        }
        case "S":
        case "SE":
        case "SW": {
          const newHeight = pageY - currentTop;

          if (newHeight > WINDOW_MIN_HEIGHT) {
            height = `${newHeight}px`;
          }
          break;
        }
      }

      if (left) osWindow.style.left = left;
      if (top) osWindow.style.top = top;

      if (width) osWindow.style.width = width;
      if (height) osWindow.style.height = height;
    });

    let cleanup: () => void;

    /** Drag stop event. */
    const onMouseUp = onLMB<HTMLBodyElement>(() => {
      cleanup();
    });

    cleanup = compose(addEventListener("mousemove", onMouseMove), addEventListener("mouseup", onMouseUp));
  });

  return handleMouseDown;
};
