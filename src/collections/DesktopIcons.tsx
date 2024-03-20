import { default as React } from 'react';
import { DesktopItem } from 'src/features/desktop/DesktopItem';
import { useKernelState } from 'src/state/useKernelState';
import type { Linker } from 'src/typings/Linker';
import type { KernelState } from 'src/typings/state/KernelState';
import { isOnDesktop } from 'src/utils/filter/isOnDesktop';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromKernel = from<KernelState>().select('installedPrograms');
////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const DesktopItems = ({}: Props) => {
  const { installedPrograms } = useKernelState(fromKernel);

  return (
    <>
      {installedPrograms.filter(isOnDesktop).map((binary) => {
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
