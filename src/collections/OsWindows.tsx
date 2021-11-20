import { default as React } from 'react';
import { OsWindow } from 'src/features/os-window/OsWindow';
import { useKernelState } from 'src/state/useKernelState';
import type { Loader } from 'src/typings/Loader';
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

export const OsWindows = ({}: Props) => {
  const { runningProcesses } = useKernelState(fromKernel);

  return (
    <>
      {runningProcesses.map((process) => {
        const { pid } = process;

        const toOsWindow: Loader = (osWindowRef) => {
          process.osWindowRef = osWindowRef;
          return process;
        };

        return <OsWindow key={pid} getProcess={toOsWindow} />;
      })}
    </>
  );
};
