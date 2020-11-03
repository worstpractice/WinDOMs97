import { RunningAreaItem } from "features/taskbar/running-area/RunningAreaItem";
import { default as React } from "react";
import { useKernelState } from "state/useKernelState";
import type { FC } from "typings/FC";
import type { ButtonLoader } from "typings/Loader";
import type { KernelState } from "typings/state/KernelState";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ runningProcesses }: KernelState) => ({
  runningProcesses,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const RunningAreaItems: FC<Props> = () => {
  const { runningProcesses } = useKernelState(fromKernel);

  return (
    <>
      {runningProcesses.map((process) => {
        const { pid } = process;

        const toRunningAreaItem: ButtonLoader = (runningAreaItemRef) => {
          process.runningAreaItemRef = runningAreaItemRef;
          return process;
        };

        return <RunningAreaItem key={`RunningAreaItem-${pid}`} getProcess={toRunningAreaItem} />;
      })}
    </>
  );
};
