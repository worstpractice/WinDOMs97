import { ContextMenu } from "components/desktop/context-menu/ContextMenu";
import { ContextMenuItem } from "components/desktop/context-menu/ContextMenuItem";
import { NotificationArea } from "components/taskbar/notifications-area/NotificationArea";
import { NotificationItem } from "components/taskbar/notifications-area/NotificationItem";
import { RunningArea } from "components/taskbar/running-area/RunningArea";
import { RunningItem } from "components/taskbar/running-area/RunningItem";
import { QuickStart } from "components/taskbar/start-area/quick-start/QuickStart";
import { QuickStartItem } from "components/taskbar/start-area/quick-start/QuickStartItem";
import { StartMenu } from "components/taskbar/start-area/start-menu/StartMenu";
import { StartMenuItem } from "components/taskbar/start-area/start-menu/StartMenuItem";
import { StartArea } from "components/taskbar/start-area/StartArea";
import { StartButton } from "components/taskbar/start-area/StartButton";
import { OsWindow } from "components/os-window/OsWindow";
import { useLastClickPosition } from "hooks/useLastClickPosition";
import { useOsMenus } from "hooks/useOsMenus";
import { useKernel } from "kernel";
import * as React from "react";
import type { FC } from "typings/FC";
import { Desktop } from "./desktop/Desktop";
import { DesktopItem } from "./desktop/desktop-item/DesktopItem";
import { Taskbar } from "./taskbar/Taskbar";

type Props = {};

export const OS: FC<Props> = () => {
  const { installedPrograms, installProgram, floppyDiscs, runningProcesses } = useKernel();
  const { openMenu, closeMenus, openContextMenu, toggleStartMenu } = useOsMenus();

  useLastClickPosition();

  const isContextMenuOpen = openMenu === "ContextMenu";

  const isStartMenuOpen = openMenu === "StartMenu";

  if (!installedPrograms.length) {
    for (const floppy of floppyDiscs) {
      installProgram(floppy);
    }
  }

  return (
    <>
      <Desktop closeMenus={closeMenus} onContextMenu={openContextMenu}>
        {isContextMenuOpen && (
          <ContextMenu>
            {installedPrograms.map((binary) => {
              const { fileName, name } = binary;

              return (
                <ContextMenuItem binary={binary} closeMenus={closeMenus} key={`ContextMenuItem-${fileName}-${name}`} />
              );
            })}
          </ContextMenu>
        )}
        {installedPrograms.map((binary) => {
          const { fileName, name } = binary;

          return <DesktopItem binary={binary} closeMenus={closeMenus} key={`DesktopItem-${fileName}-${name}`} />;
        })}
      </Desktop>
      {runningProcesses.map((process) => {
        const { name, pid } = process;

        return <OsWindow closeMenus={closeMenus} key={`OsWindow-${pid}-${name}`} process={process} />;
      })}
      {isStartMenuOpen && (
        <StartMenu>
          {installedPrograms.map((binary) => {
            const { fileName, name } = binary;

            return <StartMenuItem binary={binary} closeMenus={closeMenus} key={`StartMenuItem-${fileName}-${name}`} />;
          })}
        </StartMenu>
      )}
      <Taskbar closeMenus={closeMenus}>
        <StartArea>
          <StartButton onMouseDown={toggleStartMenu} />
          <QuickStart>
            {installedPrograms.map((binary) => {
              const { fileName, name } = binary;

              return (
                <QuickStartItem binary={binary} closeMenus={closeMenus} key={`QuickStartItem-${fileName}-${name}`} />
              );
            })}
          </QuickStart>
        </StartArea>
        <RunningArea>
          {runningProcesses.map((process) => {
            const { name, pid } = process;

            return <RunningItem closeMenus={closeMenus} key={`RunningItem-${pid}-${name}`} process={process} />;
          })}
        </RunningArea>
        <NotificationArea>
          {runningProcesses.map((process) => {
            const { name, pid } = process;

            return (
              <NotificationItem closeMenus={closeMenus} process={process} key={`NotificationItem-${pid}-${name}`} />
            );
          })}
        </NotificationArea>
      </Taskbar>
    </>
  );
};
