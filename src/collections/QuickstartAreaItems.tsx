import { QuickstartAreaItem } from "features/taskbar/start-area/quickstart-area/QuickstartAreaItem";
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

export const QuickstartAreaItems: FC<Props> = () => {
  const { installedPrograms } = useKernelState(fromKernel);

  return (
    <>
      {installedPrograms.map((binary) => {
        const { fileHash, softlinks } = binary;
        const { isInQuickstartArea } = softlinks;

        if (!isInQuickstartArea) {
          return null;
        }

        const toQuickstartAreaItem: Linker = (quickstartAreaItem) => {
          binary.quickstartAreaItemRef = quickstartAreaItem;
          return binary;
        };

        return <QuickstartAreaItem key={`QuickstartAreaItem-${fileHash}`} getBinary={toQuickstartAreaItem} />;
      })}
    </>
  );
};
