import type { MutableRefObject } from "react";

/** Places the provided element "in front of" its sibling elements. */
export const moveToForeground = <T extends HTMLDivElement | null>(item: T | MutableRefObject<T>) => {
  if ("current" in item) {
    item.current?.parentElement?.lastElementChild?.after(item.current as Node);
  } else {
    item?.parentElement?.lastElementChild?.after(item as Node);
  }
};
