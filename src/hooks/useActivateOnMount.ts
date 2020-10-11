import { useKernel } from "kernel";
import type { MutableRefObject } from "react";
import { useLayoutEffect } from "react";
import { moveInFront } from "utils/moveInFront";

export const useActivateOnMount = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const { activate } = useKernel();

  useLayoutEffect(() => {
    activate(ref);
    moveInFront(ref);
  }, [activate, ref]);
};
