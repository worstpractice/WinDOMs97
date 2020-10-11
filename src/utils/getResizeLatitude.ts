import type { MouseEvent } from "react";
import { getPixelsAlongsideOsWindow } from "utils/getPixelsAlongsideOsWindow";
import type { Latitude } from "typings/Latitude";

// prettier-ignore
export const getResizeLatitude = (osWindow: HTMLDivElement, e: MouseEvent<Element, globalThis.MouseEvent>): Latitude => {
  const { x, y } = getPixelsAlongsideOsWindow(osWindow, e);

  const { width, height } = osWindow.getBoundingClientRect();

  // const percentX = Math.ceil((x / width) * 100);
  // const percentY = Math.ceil((y / height) * 100);
  // console.log("Percent:", percentX, percentY);
  
    // N:         x > 5 && x < (width - 5)         y < 5
    // NE:        x > (width - 5)                  y < 5
    // E:         x > (width - 5)                  y > 5 && y < (height - 5)
    // SE:        x > (width - 5)                  y > (height - 5)
    // S:         x > 5 && x < (width - 5)         y > (height - 5)
    // SW:        x < 5                            y > (height - 5)
    // W:         x < 5                            y > 5 && y < (height - 5)
    // NW:        x < 5                            y < 5

    if (x > 5 && x < width - 5 && y < 5) {
      return "N";
    } else if (x > width - 5 && y < 5) {
      return "NE";
    } else if (x > width - 5 && y > 5 && y < height - 5) {
      return "E";
    } else if (x > width - 5 && y > height - 5) {
      return "SE";
    } else if (x > 5 && x < width - 5 && y > height - 5) {
      return "S";
    } else if (x < 5 && y > height - 5) {
      return "SW";
    } else if (x < 5 && y > 5 && y < height - 5) {
      return "W";
    } else if (x < 5 && y < 5) {
      return "NW";
    } else {
      throw new RangeError(
        "Attention residents. Miscount detected in your block. Cooperation with your Civil Protection team permits full ration reward.",
      );
    }
};
