import { QuickstartAreaItem } from 'features/taskbar/start-area/quickstart-area/QuickstartAreaItem';
import { useKernelState } from 'state/useKernelState';
import type { FC } from 'typings/FC';
import type { Linker } from 'typings/Linker';
import type { KernelState } from 'typings/state/KernelState';
import { forIsInQuickstartArea } from 'utils/array-helpers/filter/forIsInQuickstartArea';

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

export const QuickstartAreaItems: FC<Props> = () => {
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
