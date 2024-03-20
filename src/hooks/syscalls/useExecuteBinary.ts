import { OUT_OF_PIDS, OUT_OF_TASKBAR } from 'src/errors';
import { Pids } from 'src/kernel/Pids';
import { useErrorState } from 'src/state/useErrorState';
import { useKernelState } from 'src/state/useKernelState';
import { useRunningAreaState } from 'src/state/useRunningAreaState';
import type { Binary } from 'src/typings/Binary';
import type { ErrorState } from 'src/typings/state/ErrorState';
import type { KernelState } from 'src/typings/state/KernelState';
import type { RunningAreaState } from 'src/typings/state/RunningAreaState';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromError = from<ErrorState>().select('bluescreen');
const fromKernel = from<KernelState>().select('dangerouslyExecuteBinary', 'runningProcesses');
const fromRunningArea = from<RunningAreaState>().select('isRunningAreaFull');
////////////////////////////////////////////////////////////////

export const useExecuteBinary = (binary: Binary) => {
  const { bluescreen } = useErrorState(fromError);
  const { dangerouslyExecuteBinary, runningProcesses } = useKernelState(fromKernel);
  const { isRunningAreaFull } = useRunningAreaState(fromRunningArea);

  const safelyExecuteBinary = (): void => {
    // Check if taskbar full
    if (isRunningAreaFull) return bluescreen(OUT_OF_TASKBAR);

    const { isSingleInstanceOnly, fileHash } = binary;

    // Check if `singleInstanceOnly` && already running (quietly aborting the launch if true)
    if (isSingleInstanceOnly) {
      for (const { binaryImage } of runningProcesses) {
        if (fileHash === binaryImage.fileHash) return;
      }
    }

    // Check if system still has PIDs to spare
    const pid = Pids.alloc();

    if (pid === null) return bluescreen(OUT_OF_PIDS);

    // Confetti, we launch the process
    dangerouslyExecuteBinary(binary, pid);
  };

  return safelyExecuteBinary;
};
