import { OUT_OF_TASKBAR } from "errors";
import { useEffect } from "react";
import type { ErrorState } from "state/useErrorState";
import { useErrorState } from "state/useErrorState";
import type { KernelState } from "state/useKernelState";
import { useKernelState } from "state/useKernelState";
import type { RunningAreaState } from "state/useRunningAreaState";
import { useRunningAreaState } from "state/useRunningAreaState";
import type { Binary } from "typings/Binary";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromError = ({ bluescreen }: ErrorState) => ({
  bluescreen,
});

const fromKernel = ({ executeBinary }: KernelState) => ({
  executeBinary,
});

const fromRunningArea = ({ isRunningAreaFull }: RunningAreaState) => ({
  isRunningAreaFull,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const useExecuteBinary = (binary: Binary) => {
  const { bluescreen } = useErrorState(fromError);
  const { executeBinary } = useKernelState(fromKernel);
  const { isRunningAreaFull } = useRunningAreaState(fromRunningArea);

  useEffect(() => {
    let isCancelled = false;

    const effect = (): void => {
      if (isCancelled) return;

      if (isRunningAreaFull) {
        return bluescreen(OUT_OF_TASKBAR);
      }

      executeBinary(binary);
    };

    effect();

    return function cleanup() {
      isCancelled = true;
    };
  }, [binary, bluescreen, executeBinary, isRunningAreaFull]);
};
