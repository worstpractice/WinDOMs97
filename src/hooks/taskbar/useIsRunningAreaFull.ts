import { useLayoutEffect } from "react";
import { useKernelState } from "state/useKernelState";
import type { OsRef } from "typings/OsRef";
import type { KernelState } from "state/useKernelState";

const fromKernel = ({ setIsRunningAreaFull, runningProcesses }: KernelState) => ({
  setIsRunningAreaFull,
  runningProcesses,
});

/** Magic number. */
const RUNNING_AREA_ITEM_WIDTH = 240 as const;

export const useIsRunningAreaFull = <T extends HTMLElement>(runningAreaRef: OsRef<T>) => {
  const { setIsRunningAreaFull, runningProcesses } = useKernelState(fromKernel);

  useLayoutEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      const { current: runningArea } = runningAreaRef;

      if (!runningArea) return;

      const processes = runningProcesses.length;

      if (!processes) return;

      const runningAreaWidth = runningArea.getBoundingClientRect().width;

      /** Each running process consumes 240px of horizontal `TaskBar` space. */
      const occupied = processes * RUNNING_AREA_ITEM_WIDTH;

      const remaining = runningAreaWidth - occupied;

      const verdict = remaining < 240;

      setIsRunningAreaFull(verdict);
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [runningAreaRef, runningProcesses.length, setIsRunningAreaFull]);
};
