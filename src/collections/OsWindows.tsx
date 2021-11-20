import { OsWindow } from 'features/os-window/OsWindow';
import { useKernelState } from 'state/useKernelState';
import type { Loader } from 'typings/Loader';
import type { KernelState } from 'typings/state/KernelState';

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
