import type { OsRef } from 'src/typings/OsRef';

/** Places the provided element topmost of its sibling elements. */
export const bringToFront = <T extends OsRef<HTMLElement>>(osWindowRef: T) => {
  osWindowRef.current?.parentElement?.lastElementChild?.after(osWindowRef.current as Node);
};
