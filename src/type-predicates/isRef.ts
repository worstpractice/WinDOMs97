import type { MutableRefObject } from "react";
import { is } from "type-predicates/is";

// prettier-ignore
export const isRef = <T extends MutableRefObject<HTMLDivElement | null>>({ current: a }: T, { current: b }: T) => {
  return is(a, b);
};
