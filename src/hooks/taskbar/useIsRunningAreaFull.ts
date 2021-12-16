import { useLayoutEffect } from 'react';
import { useKernelState } from 'src/state/useKernelState';
import { useRunningAreaState } from 'src/state/useRunningAreaState';
import type { OsRef } from 'src/typings/OsRef';
import type { KernelState } from 'src/typings/state/KernelState';
import type { RunningAreaState } from 'src/typings/state/RunningAreaState';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = from<KernelState>().select('runningProcesses');
const fromRunningArea = from<RunningAreaState>().select('setIsRunningAreaFull');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

      /** Each running process occupies `RUNNING_AREA_ITEM_WIDTH`px of horizontal `TaskBar` space. */
      const occupied = processes * RUNNING_AREA_ITEM_WIDTH;

      const remaining = runningAreaWidth - occupied;

      const verdict = remaining < RUNNING_AREA_ITEM_WIDTH;

      setIsRunningAreaFull(verdict);
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [runningAreaRef, runningProcesses.length, setIsRunningAreaFull]);
};
