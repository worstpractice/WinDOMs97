import { OUT_OF_PIDS, OUT_OF_TASKBAR } from 'src/errors';
import { Pids } from 'src/kernel/Pids';
import { useErrorState } from 'src/state/useErrorState';
import { useKernelState } from 'src/state/useKernelState';
import { useRunningAreaState } from 'src/state/useRunningAreaState';
import type { Binary } from 'src/typings/Binary';
import type { ErrorState } from 'src/typings/state/ErrorState';
import type { KernelState } from 'src/typings/state/KernelState';
import type { RunningAreaState } from 'src/typings/state/RunningAreaState';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromError = ({ bluescreen }: ErrorState) => {
  return {
    bluescreen,
  };
};

const fromKernel = ({ dangerouslyExecuteBinary, runningProcesses }: KernelState) => {
  return {
    dangerouslyExecuteBinary,
    runningProcesses,
  };
};

const fromRunningArea = ({ isRunningAreaFull }: RunningAreaState) => {
  return {
    isRunningAreaFull,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useExecuteBinary = (binary: Binary) => {
  const { bluescreen } = useErrorState(fromError);
  const { dangerouslyExecuteBinary, runningProcesses } = useKernelState(fromKernel);
  const { isRunningAreaFull } = useRunningAreaState(fromRunningArea);

  const safelyExecuteBinary = () => {
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

    if (pid === null) {
      return bluescreen(OUT_OF_PIDS);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Confetti, we launch the process
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    dangerouslyExecuteBinary(binary, pid);
  };

  return safelyExecuteBinary;
};
