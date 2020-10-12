import type { MouseEvent } from "react";

// prettier-ignore
export const getPixelsAlongsideOsWindow = <T extends NonNullable<HTMLElement>, U extends MouseEvent<T>>(osWindow: T, { clientX, clientY }: U) => {
  const { x, y } = osWindow.getBoundingClientRect();

  // NOTE: Keep in mind that subtraction is NOT commutative (unlike addition).
  return {
    x: clientX - x,
    y: clientY - y,
  } as const;
};
