import { DesktopItem } from "features/desktop/DesktopItem";
import { useKernelState } from "state/useKernelState";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import type { KernelState } from "typings/state/KernelState";
import { forIsOnDesktop } from "utils/array-helpers/filter/forIsOnDesktop";

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
