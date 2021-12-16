import type { MouseEvent } from 'react';
import type { Latitude } from 'src/typings/Latitude';
import { getDistanceAlongOsWindow } from 'src/utils/os-window/getDistanceAlongOsWindow';
import { panic } from 'src/utils/panic';

export const getResizeLatitude = <T extends NonNullable<HTMLElement>, U extends MouseEvent<T>>(osWindowRef: T, event: U): Latitude => {
  const { x, y } = getDistanceAlongOsWindow(osWindowRef, event);

  const { width, height } = osWindowRef.getBoundingClientRect();

  // const percentX = Math.ceil((x / width) * 100);
  // const percentY = Math.ceil((y / height) * 100);

  // N:         x >= 10 && x <= (width - 10)       y <= 10
  // NE:        x >= (width - 10)                  y <= 10
  // E:         x >= (width - 10)                  y >= 10 && y <= (height - 10)
  // SE:        x >= (width - 10)                  y >= (height - 10)
  // S:         x >= 10 && x <= (width - 10)       y >= (height - 10)
  // SW:        x <= 10                            y >= (height - 10)
  // W:         x <= 10                            y >= 10 && y <= (height - 10)
  // NW:        x <= 10                            y <= 10

  // prettier-ignore
  return (
      x >= 10 && x <= width - 10 && y <= 10
    ? 'N'
    : x >= width - 10 && y <= 10
    ? 'NE'
    : x >= width - 10 && y >= 10 && y <= height - 10
    ? 'E'
    : x >= width - 10 && y >= height - 10
    ? 'SE'
    : x >= 10 && x <= width - 10 && y >= height - 10
    ? 'S'
    : x <= 10 && y >= height - 10
    ? 'SW'
    : x <= 10 && y >= 10 && y <= height - 10
    ? 'W'
    : x <= 10 && y <= 10
    ? 'NW'
    : panic(new RangeError(`
        x: ${x}
        y: ${y}
        width: ${width}
        height: ${height}
        heightMinus10: ${height - 10}
        widthMinus10: ${width - 10}
        isXOver10: ${x >= 10}
        isYOver10: ${y >= 10}
        isXUnder10: ${x <= 10}
        isYUnder10: ${y <= 10}
        isXAboveWidthMinus10: ${x >= width - 10}
        isYAboveHeightMinus10: ${y >= height - 10}
        isXBelowWidthMinus10: ${x <= width - 10}
        isYBelowHeightMinus10: ${y <= height - 10}
  `)));
};
