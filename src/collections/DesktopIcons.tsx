import { DesktopItem } from "features/desktop/DesktopItem";
import { default as React } from "react";
import { useKernelState } from "state/useKernelState";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import { KernelState } from "typings/state/KernelState";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ installedPrograms }: KernelState) => ({
  installedPrograms,
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const DesktopItems: FC<Props> = () => {
  const { installedPrograms } = useKernelState(fromKernel);

  return (
    <>
      {installedPrograms.map((binary) => {
        const { fileHash, softlinks } = binary;
        const { isOnDesktop } = softlinks;

        if (!isOnDesktop) {
          return null;
        }

        const toDesktopItem: Linker = (desktopItemRef) => {
          binary.desktopItemRef = desktopItemRef;
          return binary;
        };

        return <DesktopItem key={`DesktopItem-${fileHash}`} getBinary={toDesktopItem} />;
      })}
    </>
  );
};
