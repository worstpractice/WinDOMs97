import type { OsRef } from "typings/OsRef";

/** Places the provided element in front of (on top of? after?) its sibling elements. */
export const moveInFront = <T extends OsRef<HTMLElement>>(item: T) => {
  item.current?.parentElement?.lastElementChild?.after(item.current as Node);
};
