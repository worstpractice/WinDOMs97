import type { MouseEvent } from "react";
import type { Latitude } from "typings/Latitude";
import { getPixelsAlongsideOsWindow } from "utils/getPixelsAlongsideOsWindow";

// prettier-ignore
export const getResizeLatitude = <T extends NonNullable<HTMLElement>, U extends MouseEvent<T>>(osWindowRef: T, e: U): Latitude => {

  const { x, y } = getPixelsAlongsideOsWindow(osWindowRef, e);

  const { width, height } = osWindowRef.getBoundingClientRect();

  // const percentX = Math.ceil((x / width) * 100);
  // const percentY = Math.ceil((y / height) * 100);
  
    // N:         x >= 5 && x <= (width - 5)         y <= 5
    // NE:        x >= (width - 5)                  y <= 5
    // E:         x >= (width - 5)                  y >= 5 && y <= (height - 5)
    // SE:        x >= (width - 5)                  y >= (height - 5)
    // S:         x >= 5 && x <= (width - 5)         y >= (height - 5)
    // SW:        x <= 5                            y >= (height - 5)
    // W:         x <= 5                            y >= 5 && y <= (height - 5)
    // NW:        x <= 5                            y <= 5

    if (x >= 5 && x <= width - 5 && y <= 5) {
      return "N";
    } else if (x >= width - 5 && y <= 5) {
      return "NE";
    } else if (x >= width - 5 && y >= 5 && y <= height - 5) {
      return "E";
    } else if (x >= width - 5 && y >= height - 5) {
      return "SE";
    } else if (x >= 5 && x <= width - 5 && y >= height - 5) {
      return "S";
    } else if (x <= 5 && y >= height - 5) {
      return "SW";
    } else if (x <= 5 && y >= 5 && y <= height - 5) {
      return "W";
    } else if (x <= 5 && y <= 5) {
      return "NW";
    } else {
      throw new RangeError(`
        x: ${x}
        y: ${y}
        width: ${width}
        height: ${height}

        heightMinus5: ${height - 5}
        widthMinus5: ${width - 5}

        isXOver5: ${x >= 5}
        isYOver5: ${y >= 5}
        
        isXUnder5: ${x <= 5}
        isYUnder5: ${y <= 5}

        isXAboveWidthMinus5: ${x >= width - 5}
        isYAboveHeightMinus5: ${y >= height - 5}

        isXBelowWidthMinus5: ${x <= width - 5}
        isYBelowHeightMinus5: ${y <= height - 5}
      `);
    }
};
