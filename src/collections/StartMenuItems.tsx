import { StartMenuItem } from "features/taskbar/start-area/start-menu/StartMenuItem";
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

export const StartMenuItems: FC<Props> = () => {
  const { installedPrograms } = useKernelState(fromKernel);

  return (
    <>
      {installedPrograms.map((binary) => {
        const { fileHash, softlinks } = binary;
        const { isOnStartMenu } = softlinks;

        if (!isOnStartMenu) {
          return null;
        }

        const toStartMenuItem: Linker = (startMenuItemRef) => {
          binary.startMenuItemRef = startMenuItemRef;
          return binary;
        };

        return <StartMenuItem key={`StartMenuItem-${fileHash}`} getBinary={toStartMenuItem} />;
      })}
    </>
  );
};
