import { useKernel } from "kernel";
import { useLayoutEffect } from "react";
import type { Kernel } from "typings/kernel/Kernel";
import type { OsRef } from "typings/OsRef";
import { moveInFront } from "utils/moveInFront";

const selector = ({ activate }: Kernel) => ({
  activate,
});

export const useActivateOnMount = <T extends OsRef<HTMLElement>>(ref: T) => {
  const { activate } = useKernel(selector);

  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      activate(ref);
      moveInFront(ref);
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [activate, ref]);
};
