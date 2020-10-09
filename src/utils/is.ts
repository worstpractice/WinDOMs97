import type { MutableRefObject } from "react";

// prettier-ignore
export const is = <T extends MutableRefObject<HTMLDivElement | null>>({ current: a }: T, { current: b }: T): boolean => {
  return (!!a || !!b) && Object.is(a, b);
};
