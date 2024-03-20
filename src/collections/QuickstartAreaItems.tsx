import { default as React } from 'react';
import { QuickstartAreaItem } from 'src/features/taskbar/start-area/quickstart-area/QuickstartAreaItem';
import { useKernelState } from 'src/state/useKernelState';
import type { Linker } from 'src/typings/Linker';
import type { KernelState } from 'src/typings/state/KernelState';
import { isInQuickstartArea } from 'src/utils/filter/isInQuickstartArea';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromKernel = from<KernelState>().select('installedPrograms');
////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const QuickstartAreaItems = ({}: Props) => {
  const { installedPrograms } = useKernelState(fromKernel);

  return (
    <>
      {installedPrograms.filter(isInQuickstartArea).map((binary) => {
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
