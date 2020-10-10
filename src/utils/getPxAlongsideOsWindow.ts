import type { MouseEvent } from "react";

// prettier-ignore
export const getPxAlongsideOsWindow = (osWindow: HTMLDivElement, { clientX, clientY }: MouseEvent<Element, globalThis.MouseEvent>) => {
  const { x, y } = osWindow.getBoundingClientRect();

  // NOTE: Keep in mind that subtraction is NOT commutative (unlike addition).
  return {
    x: clientX - x,
    y: clientY - y,
  } as const;
};
