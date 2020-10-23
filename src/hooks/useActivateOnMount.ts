import { useKernel } from "kernel";
import { useEffect } from "react";
import type { OsRef } from "typings/OsRef";
import { moveInFront } from "utils/moveInFront";

export const useActivateOnMount = <T extends OsRef<HTMLElement>>(ref: T) => {
  const { activate } = useKernel();

  useEffect(() => {
    activate(ref);
    moveInFront(ref);
  }, [activate, ref]);
};
