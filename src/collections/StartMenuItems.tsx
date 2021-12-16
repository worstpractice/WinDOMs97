import { default as React } from 'react';
import { StartMenuItem } from 'src/features/taskbar/start-area/start-menu/StartMenuItem';
import { useKernelState } from 'src/state/useKernelState';
import type { Linker } from 'src/typings/Linker';
import type { KernelState } from 'src/typings/state/KernelState';
import { isInStartMenu } from 'src/utils/filter/isInStartMenu';
import { from } from 'src/utils/state/from';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = from<KernelState>().select('installedPrograms');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const StartMenuItems = ({}: Props) => {
  const { installedPrograms } = useKernelState(fromKernel);

  return (
    <>
      {installedPrograms.filter(isInStartMenu).map((binary) => {
        const { fileHash } = binary;

        const toStartMenuItem: Linker = (startMenuItemRef) => {
          binary.startMenuItemRef = startMenuItemRef;
          return binary;
        };

        return <StartMenuItem key={fileHash} getBinary={toStartMenuItem} />;
      })}
    </>
  );
};
