import type { OsRef } from "typings/OsRef";

/** Places the provided element the topmost of its sibling elements. */
export const moveInFront = <T extends OsRef<HTMLElement>>(osWindowRef: T) => {
  osWindowRef.current?.parentElement?.lastElementChild?.after(osWindowRef.current as Node);
};
