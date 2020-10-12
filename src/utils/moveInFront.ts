import type { OsRef } from "typings/OsRef";

/** Places the provided element "in front of" its sibling elements. */
export const moveInFront = <T extends OsRef<HTMLElement>>(item: T) => {
  item.current?.parentElement?.lastElementChild?.after(item.current as Node);
};
