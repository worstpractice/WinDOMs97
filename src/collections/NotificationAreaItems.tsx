import { NotificationAreaItem } from 'features/taskbar/notification-area/NotificationAreaItem';
import { useKernelState } from 'state/useKernelState';
import type { FC } from 'typings/FC';
import type { LiLoader } from 'typings/Loader';
import type { KernelState } from 'typings/state/KernelState';

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

export const NotificationAreaItems: FC<Props> = () => {
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
