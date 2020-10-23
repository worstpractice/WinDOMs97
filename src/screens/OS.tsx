import { useLastClickPosition } from "hooks/useLastClickPosition";
import { useKernel } from "kernel";
import { programs } from "programs";
import { default as React } from "react";
import type { FC } from "typings/FC";
import { Linker } from "typings/Linker";
import { ContextMenu } from "screens/desktop/context-menu/ContextMenu";
import { ContextMenuItem } from "screens/desktop/context-menu/ContextMenuItem";
import { Desktop } from "screens/desktop/Desktop";
import { DesktopItem } from "screens/desktop/DesktopItem";
import { OsWindow } from "screens/os-window/OsWindow";
import { NotificationArea } from "screens/taskbar/notification-area/NotificationArea";
import { NotificationItem } from "screens/taskbar/notification-area/NotificationItem";
import { RunningArea } from "screens/taskbar/running-area/RunningArea";
import { RunningAreaItem } from "screens/taskbar/running-area/RunningAreaItem";
import { QuickstartArea } from "screens/taskbar/start-area/quickstart-area/QuickstartArea";
import { QuickstartAreaItem } from "screens/taskbar/start-area/quickstart-area/QuickstartAreaItem";
import { StartMenu } from "screens/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "screens/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "screens/taskbar/start-area/StartArea";
import { StartButton } from "screens/taskbar/start-area/StartButton";
import { Taskbar } from "screens/taskbar/Taskbar";

type Props = {};

export const OS: FC<Props> = () => {
  const { alternatives, installedPrograms, installProgram, openMenu, runningProcesses } = useKernel();
  useLastClickPosition();

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
            // NOTE: This is vital.
            binary.desktopItemRef = desktopItemRef;

            return binary;
          };

          return <DesktopItem key={`DesktopItem-${fileName}-${name}`} getBinary={toDesktopItem} />;
        })}
      </Desktop>
      {runningProcesses.map((process) => {
        const { name, pid } = process;

        return <OsWindow key={`OsWindow-${pid}-${name}`} process={process} />;
      })}
      {isStartMenuOpen && (
        <StartMenu>
          {installedPrograms.map((binary) => {
            const { fileName, name } = binary;

            const toStartMenuItem: Linker = (startMenuItemRef) => {
              // NOTE: This is vital.
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
                // NOTE: This is vital.
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
            const { name, pid } = process;

            return <RunningAreaItem key={`RunningAreaItem-${pid}-${name}`} process={process} />;
          })}
        </RunningArea>
        <NotificationArea>
          {runningProcesses.map((process) => {
            const { name, pid } = process;

            return <NotificationItem key={`NotificationAreaItem-${pid}-${name}`} process={process} />;
          })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
