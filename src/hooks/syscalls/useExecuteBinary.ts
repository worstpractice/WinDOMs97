import { OUT_OF_PIDS, OUT_OF_TASKBAR } from "errors";
import { Pids } from "kernel/Pids";
import { useCallback } from "react";
import { useErrorState } from "state/useErrorState";
import { useKernelState } from "state/useKernelState";
import { useRunningAreaState } from "state/useRunningAreaState";
import { isNull } from "type-predicates/isNull";
import type { Binary } from "typings/Binary";
import type { ErrorState } from "typings/state/ErrorState";
import type { KernelState } from "typings/state/KernelState";
import type { RunningAreaState } from "typings/state/RunningAreaState";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromError = ({ bluescreen }: ErrorState) => ({
  bluescreen,
});

const fromKernel = ({ dangerouslyExecuteBinary, runningProcesses }: KernelState) => ({
  dangerouslyExecuteBinary,
  runningProcesses,
});

const fromRunningArea = ({ isRunningAreaFull }: RunningAreaState) => ({
  isRunningAreaFull,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useExecuteBinary = (binary: Binary) => {
  const { bluescreen } = useErrorState(fromError);
  const { dangerouslyExecuteBinary, runningProcesses } = useKernelState(fromKernel);
  const { isRunningAreaFull } = useRunningAreaState(fromRunningArea);

  const safelyExecuteBinary = useCallback(() => {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Check if taskbar full
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (isRunningAreaFull) {
      return bluescreen(OUT_OF_TASKBAR);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Check if `singleInstanceOnly` && already running
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const { isSingleInstanceOnly } = binary;

    if (isSingleInstanceOnly) {
      const { fileHash: targetHash } = binary;

      for (const { binaryImage } of runningProcesses) {
        const { fileHash } = binaryImage;

        if (fileHash === targetHash) {
          // If the process is `singleInstanceOnly` AND is already running, we quietly abort the launch
          return;
        }
      }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Check if system still has PIDs to spare
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const pid = Pids.use();

    if (isNull(pid)) {
      return bluescreen(OUT_OF_PIDS);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Confetti, we launch the process
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    dangerouslyExecuteBinary(binary, pid);
  }, [binary, bluescreen, dangerouslyExecuteBinary, isRunningAreaFull, runningProcesses]);

  return safelyExecuteBinary;
};
