import { default as React } from 'react';
import { OsWindow } from 'src/features/os-window/OsWindow';
import { useKernelState } from 'src/state/useKernelState';
import type { Loader } from 'src/typings/Loader';
import type { KernelState } from 'src/typings/state/KernelState';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromKernel = from<KernelState>().select('runningProcesses');
////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

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
