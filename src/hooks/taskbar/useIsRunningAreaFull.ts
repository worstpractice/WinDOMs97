import { useLayoutEffect } from "react";
import type { KernelState } from "state/useKernelState";
import { useKernelState } from "state/useKernelState";
import type { RunningAreaState } from "state/useRunningAreaState";
import { useRunningAreaState } from "state/useRunningAreaState";
import type { OsRef } from "typings/OsRef";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromKernel = ({ runningProcesses }: KernelState) => ({
  runningProcesses,
});

const fromRunningArea = ({ setIsRunningAreaFull }: RunningAreaState) => ({
  setIsRunningAreaFull,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/** Magic number. */
const RUNNING_AREA_ITEM_WIDTH = 240 as const;

export const useIsRunningAreaFull = <T extends HTMLElement>(runningAreaRef: OsRef<T>) => {
  const { runningProcesses } = useKernelState(fromKernel);
  const { setIsRunningAreaFull } = useRunningAreaState(fromRunningArea);

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
