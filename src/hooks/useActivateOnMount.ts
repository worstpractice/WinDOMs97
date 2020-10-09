import type { MutableRefObject } from "react";
import { useLayoutEffect } from "react";
import { useStore } from "store";
import { moveInFront } from "utils/moveInFront";

export const useActivateOnMount = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const { activate } = useStore();

  useLayoutEffect(() => {
    activate(ref);
    moveInFront(ref);
  }, [activate, ref]);
};
