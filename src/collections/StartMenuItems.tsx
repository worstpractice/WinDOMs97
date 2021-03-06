import { StartMenuItem } from "features/taskbar/start-area/start-menu/StartMenuItem";
import { useKernelState } from "state/useKernelState";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import type { KernelState } from "typings/state/KernelState";
import { forIsOnStartMenu } from "utils/array-helpers/filter/forIsOnStartMenu";

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
