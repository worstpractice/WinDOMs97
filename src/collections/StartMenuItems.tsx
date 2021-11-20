import { default as React } from 'react';
import { StartMenuItem } from 'src/features/taskbar/start-area/start-menu/StartMenuItem';
import { useKernelState } from 'src/state/useKernelState';
import type { Linker } from 'src/typings/Linker';
import type { KernelState } from 'src/typings/state/KernelState';
import { forIsOnStartMenu } from 'src/utils/array-helpers/filter/forIsOnStartMenu';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ installedPrograms }: KernelState) => {
  return {
    installedPrograms,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const StartMenuItems = ({}: Props) => {
  const { installedPrograms } = useKernelState(fromKernel);

  const visibleOnStartMenu = installedPrograms.filter(forIsOnStartMenu);

  return (
    <>
      {visibleOnStartMenu.map((binary) => {
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
