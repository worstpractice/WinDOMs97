import { useKernel } from "kernel";
import { useLayoutEffect } from "react";
import type { OsRef } from "typings/OsRef";
import { moveInFront } from "utils/moveInFront";

export const useActivateOnMount = (ref: OsRef) => {
  const { activate } = useKernel();

  useLayoutEffect(() => {
    activate(ref);
    moveInFront(ref);
  }, [activate, ref]);
};
