import { default as React } from 'react';
import { NotificationAreaItem } from 'src/features/taskbar/notification-area/NotificationAreaItem';
import { useKernelState } from 'src/state/useKernelState';
import type { LiLoader } from 'src/typings/Loader';
import type { KernelState } from 'src/typings/state/KernelState';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fromKernel = ({ runningProcesses }: KernelState) => {
  return {
    runningProcesses,
  };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

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
