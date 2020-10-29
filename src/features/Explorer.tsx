import { programs } from "data";
import { Bsod } from "features/Bsod";
import { ContextMenu } from "features/context-menu/ContextMenu";
import { ContextMenuItem } from "features/context-menu/ContextMenuItem";
import { Desktop } from "features/desktop/Desktop";
import { DesktopItem } from "features/desktop/DesktopItem";
import { OsWindow } from "features/os-window/OsWindow";
import { NotificationArea } from "features/taskbar/notification-area/NotificationArea";
import { NotificationAreaItem } from "features/taskbar/notification-area/NotificationAreaItem";
import { RunningArea } from "features/taskbar/running-area/RunningArea";
import { RunningAreaItem } from "features/taskbar/running-area/RunningAreaItem";
import { QuickstartArea } from "features/taskbar/start-area/quickstart-area/QuickstartArea";
import { QuickstartAreaItem } from "features/taskbar/start-area/quickstart-area/QuickstartAreaItem";
import { StartMenu } from "features/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "features/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "features/taskbar/start-area/StartArea";
import { StartButton } from "features/taskbar/start-area/StartButton";
import { Taskbar } from "features/taskbar/Taskbar";
import { useLastClickPosition } from "hooks/useLastClickPosition";
import { default as React } from "react";
import type { ErrorState } from "state/useErrorState";
import { useErrorState } from "state/useErrorState";
import type { KernelState } from "state/useKernelState";
import { useKernelState } from "state/useKernelState";
import type { MenuState } from "state/useMenuState";
import { useMenuState } from "state/useMenuState";
import type { FC } from "typings/FC";
import type { Linker } from "typings/Linker";
import type { ButtonLoader, LiLoader, Loader } from "typings/Loader";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//* Selectors *
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const fromError = ({ isBsod }: ErrorState) => ({
  isBsod,
});

const fromKernel = ({ installedPrograms, installProgram, runningProcesses }: KernelState) => ({
  installedPrograms,
  installProgram,
  runningProcesses,
});

const fromMenu = ({ alternatives, openMenu }: MenuState) => ({
  alternatives,
  openMenu,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Props = {};

export const Explorer: FC<Props> = () => {
  const { isBsod } = useErrorState(fromError);
  const { installedPrograms, installProgram, runningProcesses } = useKernelState(fromKernel);
  const { alternatives, openMenu } = useMenuState(fromMenu);
  useLastClickPosition();

  if (isBsod) {
    return <Bsod />;
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
          const { fileName, name, softlinks } = binary;
          const { isOnDesktop } = softlinks;

          if (!isOnDesktop) {
            return null;
          }

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
            const { fileName, name, softlinks } = binary;
            const { isOnStartMenu } = softlinks;

            if (!isOnStartMenu) {
              return null;
            }

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
              const { fileName, name, softlinks } = binary;
              const { isInQuickstartArea } = softlinks;

              if (!isInQuickstartArea) {
                return null;
              }

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

            return (
              <NotificationAreaItem key={`NotificationAreaItem-${pid}-${name}`} getProcess={toNotificationAreaItem} />
            );
          })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
