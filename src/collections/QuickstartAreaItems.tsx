import { default as React } from 'react';
import { QuickstartAreaItem } from 'src/features/taskbar/start-area/quickstart-area/QuickstartAreaItem';
import { useKernelState } from 'src/state/useKernelState';
import type { Linker } from 'src/typings/Linker';
import type { KernelState } from 'src/typings/state/KernelState';
import { forIsInQuickstartArea } from 'src/utils/array-helpers/filter/forIsInQuickstartArea';

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

export const QuickstartAreaItems = ({}: Props) => {
  const { installedPrograms } = useKernelState(fromKernel);

  const visibleInQuickstartArea = installedPrograms.filter(forIsInQuickstartArea);

  return (
    <>
      {visibleInQuickstartArea.map((binary) => {
        const { fileHash } = binary;

        const toQuickstartAreaItem: Linker = (quickstartAreaItem) => {
          binary.quickstartAreaItemRef = quickstartAreaItem;
          return binary;
        };

        return <QuickstartAreaItem key={fileHash} getBinary={toQuickstartAreaItem} />;
      })}
    </>
  );
};
