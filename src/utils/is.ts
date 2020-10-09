import type { MutableRefObject } from "react";

export const is = <T extends MutableRefObject<HTMLDivElement | null>>(a: T, b: T): a is T => {
  return Object.is(a.current, b.current);
};
