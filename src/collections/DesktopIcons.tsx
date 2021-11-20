import { default as React } from 'react';
import { DesktopItem } from 'src/features/desktop/DesktopItem';
import { useKernelState } from 'src/state/useKernelState';
import type { Linker } from 'src/typings/Linker';
import type { KernelState } from 'src/typings/state/KernelState';
import { forIsOnDesktop } from 'src/utils/array-helpers/filter/forIsOnDesktop';

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

export const DesktopItems = ({}: Props) => {
  const { installedPrograms } = useKernelState(fromKernel);

  const visibleOnDesktop = installedPrograms.filter(forIsOnDesktop);

  return (
    <>
      {visibleOnDesktop.map((binary) => {
        const { fileHash } = binary;

        const toDesktopItem: Linker = (desktopItemRef) => {
          binary.desktopItemRef = desktopItemRef;
          return binary;
        };

        return <DesktopItem key={fileHash} getBinary={toDesktopItem} />;
      })}
    </>
  );
};
