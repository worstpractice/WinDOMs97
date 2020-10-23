import { useKernel } from "kernel";
import { useEffect } from "react";
import type { OsRef } from "typings/OsRef";

/** Magic number. */
const RUNNING_AREA_ITEM_WIDTH = 240 as const;

export const useIsRunningAreaFull = <T extends HTMLElement>(runningAreaRef: OsRef<T>) => {
  const { isRunningAreaFull, setIsRunningAreaFull, runningProcesses } = useKernel();

  useEffect(() => {
    const { current: runningArea } = runningAreaRef;

    if (!runningArea) return;

    const processes = runningProcesses.length;

    if (!processes) return;

    const runningAreaWidth = runningArea.getBoundingClientRect().width;

    /** Each running process consumes 240px of horizontal `TaskBar` space. */
    const occupied = processes * RUNNING_AREA_ITEM_WIDTH;

    const remaining = runningAreaWidth - occupied;

    const verdict = remaining < 240;

    console.log(`Is running area full: ${verdict}`);

    setIsRunningAreaFull(verdict);
  }, [isRunningAreaFull, runningAreaRef, runningProcesses.length, setIsRunningAreaFull]);
};