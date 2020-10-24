import { useLastClickPosition } from "hooks/useLastClickPosition";
import { useKernel } from "kernel";
import { programs } from "programs";
import { default as React } from "react";
import { BSOD } from "screens/BSOD";
import { ContextMenu } from "screens/desktop/context-menu/ContextMenu";
import { ContextMenuItem } from "screens/desktop/context-menu/ContextMenuItem";
import { Desktop } from "screens/desktop/Desktop";
import { DesktopItem } from "screens/desktop/DesktopItem";
import { OsWindow } from "screens/os-window/OsWindow";
import { NotificationArea } from "screens/taskbar/notification-area/NotificationArea";
import { NotificationAreaItem } from "screens/taskbar/notification-area/NotificationAreaItem";
import { RunningArea } from "screens/taskbar/running-area/RunningArea";
import { RunningAreaItem } from "screens/taskbar/running-area/RunningAreaItem";
import { QuickstartArea } from "screens/taskbar/start-area/quickstart-area/QuickstartArea";
import { QuickstartAreaItem } from "screens/taskbar/start-area/quickstart-area/QuickstartAreaItem";
import { StartMenu } from "screens/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "screens/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "screens/taskbar/start-area/StartArea";
import { StartButton } from "screens/taskbar/start-area/StartButton";
import { Taskbar } from "screens/taskbar/Taskbar";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import type { Loader, LiLoader, ButtonLoader } from "typings/Loader";

type Props = {};

export const OS: FC<Props> = () => {
  const { alternatives, isBsod, installedPrograms, installProgram, openMenu, runningProcesses } = useKernel();
  useLastClickPosition();

  if (isBsod) {
    return <BSOD />;
  }

  if (!installedPrograms.length) {
    for (const each of programs) {
      installProgram(each);
    }
  }

  const isContextMenuOpen = openMenu === "ContextMenu";

  const isStartMenuOpen = openMenu === "StartMenu";

  return (
    <>
      <Desktop>
        {isContextMenuOpen && (
          <ContextMenu>
            {alternatives.map((alternative) => {
              const { name } = alternative;

              return <ContextMenuItem alternative={alternative} key={`ContextMenuItem-${name}`} />;
            })}
          </ContextMenu>
        )}
        {installedPrograms.map((binary) => {
          const { fileName, name } = binary;

          const toDesktopItem: Linker = (desktopItemRef) => {
            binary.desktopItemRef = desktopItemRef;
            return binary;
          };

          return <DesktopItem key={`DesktopItem-${fileName}-${name}`} getBinary={toDesktopItem} />;
        })}
      </Desktop>
      {runningProcesses.map((process) => {
        const { binaryImage, pid } = process;
        const { name } = binaryImage;

        const toOsWindow: Loader = (osWindowRef) => {
          process.osWindowRef = osWindowRef;
          return process;
        };

        return <OsWindow key={`OsWindow-${pid}-${name}`} getProcess={toOsWindow} />;
      })}
      {isStartMenuOpen && (
        <StartMenu>
          {installedPrograms.map((binary) => {
            const { fileName, name } = binary;

            const toStartMenuItem: Linker = (startMenuItemRef) => {
              binary.startMenuItemRef = startMenuItemRef;
              return binary;
            };

            return <StartMenuItem key={`StartMenuItem-${fileName}-${name}`} getBinary={toStartMenuItem} />;
          })}
        </StartMenu>
      )}
      <Taskbar>
        <StartArea>
          <StartButton />
          <QuickstartArea>
            {installedPrograms.map((binary) => {
              const { fileName, name } = binary;

              const toQuickstartAreaItem: Linker = (quickstartAreaItem) => {
                binary.quickstartAreaItemRef = quickstartAreaItem;
                return binary;
              };

              return (
                <QuickstartAreaItem key={`QuickstartAreaItem-${fileName}-${name}`} getBinary={toQuickstartAreaItem} />
              );
            })}
          </QuickstartArea>
        </StartArea>
        <RunningArea>
          {runningProcesses.map((process) => {
            const { binaryImage, pid } = process;
            const { name } = binaryImage;

            const toRunningAreaItem: ButtonLoader = (runningAreaItemRef) => {
              process.runningAreaItemRef = runningAreaItemRef;
              return process;
            };

            return <RunningAreaItem key={`RunningAreaItem-${pid}-${name}`} getProcess={toRunningAreaItem} />;
          })}
        </RunningArea>
        <NotificationArea>
          {runningProcesses.map((process) => {
            const { binaryImage, pid } = process;
            const { name } = binaryImage;

            const toNotificationAreaItem: LiLoader = (notificationAreaItemRef) => {
              process.notificationAreaItemRef = notificationAreaItemRef;
              return process;
            };

            return <NotificationAreaItem key={`NotificationAreaItem-${pid}-${name}`} getProcess={toNotificationAreaItem} />;
          })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
