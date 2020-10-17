import { onLMB } from "event-filters/onLMB";
import type { OsRef } from "typings/OsRef";
import { compose } from "utils/compose";
import { getResizeLatitude } from "components/os-window/utils/getResizeLatitude";
import { listen } from "utils/listen";
import { moveInFront } from "utils/moveInFront";

/** In pixels. */
const OSWINDOW_MIN_HEIGHT = 250 as const;
const OSWINDOW_MIN_WIDTH = 350 as const;

export const useOnResizeWindow = <T extends OsRef<U>, U extends HTMLElement>(osWindowRef: T) => {
  /** Drag start event. */
  const handleMouseDown = onLMB<U>((e) => {
    const { current: osWindow } = osWindowRef;
    if (!osWindow) return;

    moveInFront(osWindowRef);

    const latitude = getResizeLatitude(osWindow, e);

    const { clientX, clientY } = e;

    const startingLeft = osWindow.getBoundingClientRect().left;
    const startingTop = osWindow.getBoundingClientRect().top;

    const startingShiftX = clientX - startingLeft;
    const startingShiftY = clientY - startingTop;

    const startingWidth = osWindow.getBoundingClientRect().width;
    const startingHeight = osWindow.getBoundingClientRect().height;

    /** Stream of events while dragging. */
    const onMouseMove = onLMB<Document>(({ clientX, clientY }) => {
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
          const availableWidth = currentWidth - OSWINDOW_MIN_WIDTH;

          // We're actively concerned about negative values here.
          const isAvailableWidth = availableWidth > 0;

          if (isAvailableWidth) {
            const newLeft = clientX - startingShiftX;

            const deltaLeft = startingLeft + availableWidth;

            if (newLeft < deltaLeft) {
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
          const availableHeight = currentHeight - OSWINDOW_MIN_HEIGHT;

          // We're actively concerned about negative values here.
          const isAvailableHeight = availableHeight > 0;

          if (isAvailableHeight) {
            const newTop = clientY - startingShiftY;

            const deltaTop = startingTop + availableHeight;

            if (newTop < deltaTop) {
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
          const newWidth = clientX - currentLeft;

          if (newWidth > OSWINDOW_MIN_WIDTH) {
            width = `${newWidth}px`;
          }
          break;
        }
        case "W":
        case "NW":
        case "SW": {
          const deltaLeft = startingLeft - currentLeft;

          const newWidth = startingWidth + deltaLeft;

          if (newWidth > OSWINDOW_MIN_WIDTH) {
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
          const deltaTop = startingTop - currentTop;

          const newHeight = startingHeight + deltaTop;

          if (newHeight > OSWINDOW_MIN_HEIGHT) {
            height = `${newHeight}px`;
          }
          break;
        }
        case "S":
        case "SE":
        case "SW": {
          const newHeight = clientY - currentTop;

          if (newHeight > OSWINDOW_MIN_HEIGHT) {
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
