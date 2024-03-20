import { default as React } from 'react';
import { NotificationAreaItem } from 'src/features/taskbar/notification-area/NotificationAreaItem';
import { useKernelState } from 'src/state/useKernelState';
import type { LiLoader } from 'src/typings/Loader';
import type { KernelState } from 'src/typings/state/KernelState';
import { from } from 'src/utils/state/from';

////////////////////////////////////////////////////////////////
//* Selectors *
////////////////////////////////////////////////////////////////
const fromKernel = from<KernelState>().select('runningProcesses');
////////////////////////////////////////////////////////////////

type Props = {
  readonly [key in PropertyKey]-?: never;
};

export const NotificationAreaItems = ({}: Props) => {
  const { runningProcesses } = useKernelState(fromKernel);

  return (
    <>
      {runningProcesses.map((process) => {
        const { pid } = process;

        const toNotificationAreaItem: LiLoader = (notificationAreaItemRef) => {
          process.notificationAreaItemRef = notificationAreaItemRef;
          return process;
        };

        return <NotificationAreaItem key={pid} getProcess={toNotificationAreaItem} />;
      })}
    </>
  );
};
