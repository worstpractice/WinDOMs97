import { default as React } from 'react';
import { RunningAreaItem } from 'src/features/taskbar/running-area/RunningAreaItem';
import { useKernelState } from 'src/state/useKernelState';
import type { ButtonLoader } from 'src/typings/Loader';
import type { KernelState } from 'src/typings/state/KernelState';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ runningProcesses }: KernelState) => {
  return {
    runningProcesses,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const RunningAreaItems = ({}: Props) => {
  const { runningProcesses } = useKernelState(fromKernel);

  return (
    <>
      {runningProcesses.map((process) => {
        const { pid } = process;

        const toRunningAreaItem: ButtonLoader = (runningAreaItemRef) => {
          process.runningAreaItemRef = runningAreaItemRef;
          return process;
        };

        return <RunningAreaItem key={pid} getProcess={toRunningAreaItem} />;
      })}
    </>
  );
};
